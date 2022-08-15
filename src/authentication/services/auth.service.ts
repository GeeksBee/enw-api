import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import UserService from "src/modules/user/services/user.service";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { AccessTokenPayload } from "../interfaces/tokenPayload.interface";
import { JwtService } from "@nestjs/jwt";
import { ConfigProps } from "src/config/configValidationSchema";
import SessionService from "./session.service";
import { RefreshTokenPayload } from "../interfaces/refreshPayload.interface";

@Injectable()
export default class AuthenticationService {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService<ConfigProps>,
        private readonly jwtService: JwtService,
        private readonly sessionService: SessionService,
    ) {}
    public async getAuthenticatedUser(email: string, password: string) {
        try {
            const user = await this.userService.getByEmail(email);
            if (!user) throw new NotFoundException(`user with the email ${email} does not exist`);
            await this.verifyPassword(password, user.password);
            if (!user.isEmailConfirmed)
                throw new HttpException("email not verified", HttpStatus.FORBIDDEN);
            return user;
        } catch (error: any) {
            if (error instanceof HttpException) throw error;
            // TODO test this feature
            console.log(error); // TODO remove console.log
            throw new HttpException(
                this.configService.get("internalServerErrorMessage"),
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    public async getUserIfRefreshTokenMatches(sessionId: number) {
        const session = await this.sessionService.findSessionById(sessionId);
        if (!session || !session.valid)
            throw new HttpException("refresh Token has expired", HttpStatus.UNAUTHORIZED);

        const user = await this.userService.getById(session.user.id);
        if (user) return user;
    }

    public getCookieWithJwtAccessToken(userId: number) {
        const payload: AccessTokenPayload = { userId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get("JWT_ACCESS_TOKEN_SECRET"),
            expiresIn: `${this.configService.get<number>("JWT_ACCESS_TOKEN_EXPIRATION_TIME")}s`,
        });
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
            "JWT_ACCESS_TOKEN_EXPIRATION_TIME",
        )}`;
    }

    public getCookieForLogOut() {
        return "Authentication=; HttpOnly; Path=/; Max-Age=0";
    }

    public async getRefreshToken(userId: number) {
        const session = await this.sessionService.createSession(userId);
        const payload: RefreshTokenPayload = { session: session.id };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get("JWT_REFRESH_TOKEN_SECRET"),
            expiresIn: `${this.configService.get<number>("JWT_REFRESH_TOKEN_EXPIRATION_TIME")}s`,
        });
        return token;
    }

    public async revokeRefreshToken(refreshToken: string) {
        const decoded: RefreshTokenPayload = this.jwtService.verify(refreshToken, {
            secret: this.configService.get("JWT_REFRESH_TOKEN_SECRET"),
        });
        if (!decoded) return;
        await this.sessionService.invalidateRefreshToken(decoded.session);
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
        if (!isPasswordMatching) {
            throw new HttpException("Wrong credentials provided", HttpStatus.BAD_REQUEST);
        }
    }
}
