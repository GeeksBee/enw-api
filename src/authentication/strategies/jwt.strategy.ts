import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import UserService from "src/modules/user/services/user.service";
import { AccessTokenPayload } from "../interfaces/tokenPayload.interface";
import { ConfigProps } from "src/config/configValidationSchema";
// const pattern = /?<= \.+/;
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService<ConfigProps>,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    // return pattern.e;
                    // return request?.headers?.authorization.split(" ")[1];
                    // console.log(request?.cookies?.accessToken);
                    // console.log(request.headers);
                    // console.log(request.cookies);
                    return request?.cookies?.accessToken
                        ? request?.cookies?.accessToken
                        : request.headers.authorization.split(" ")[1];
                },
            ]),
            secretOrKey: configService.get("JWT_ACCESS_TOKEN_SECRET"),
        });
    }

    async validate(payload: AccessTokenPayload) {
        return this.userService.getById(payload.userId);
    }
}
