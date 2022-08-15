import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { ConfigProps } from "src/config/configValidationSchema";
import AuthenticationService from "../services/auth.service";
import { RefreshTokenPayload } from "../interfaces/refreshPayload.interface";
import { get } from "lodash";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh-token") {
    constructor(
        private readonly configService: ConfigService<ConfigProps>,
        private readonly authenticationService: AuthenticationService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return get(request, "headers.x-refresh");
                },
            ]),
            secretOrKey: configService.get("JWT_REFRESH_TOKEN_SECRET"),
            passReqToCallback: true,
        });
    }

    async validate(request: Request, payload: RefreshTokenPayload) {
        return this.authenticationService.getUserIfRefreshTokenMatches(payload.session);
    }
}
