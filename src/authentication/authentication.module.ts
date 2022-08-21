import { Module } from "@nestjs/common";
import { UserModule } from "../modules/user/user.module";
import SessionService from "./services/session.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import Session from "./entities/session.entity";
import User from "../modules/user/entities/user.entity";
import AdminAuthenticationController from "./controllers/admin.auth.controller";
import AdminAuthenticationService from "./services/admin.auth.service";
import AuthenticationService from "./services/auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtAsyncConfig } from "src/config/jwt.config";
import { JwtStrategy } from "./strategies/jwt.strategy";
import AuthenticationController from "./controllers/auth.controller";
import { JwtRefreshTokenStrategy } from "./strategies/jwtRefreshToken.strategy";
import EmployerAuthenticationController from "./controllers/employer.auth.controller";
import { EmailModule } from "src/email/email.module";
import EmployerAuthenticationService from "./services/employer.auth.service";
import { PhoneModule } from "src/phone/phone.module";
import ApplicantAuthenticationController from "./controllers/applicant.controller";
import { OrganisationModule } from "src/modules/organisation/organisation.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Session, User]),
        UserModule,
        PassportModule,
        JwtModule.registerAsync(JwtAsyncConfig),
        EmailModule,
        PhoneModule,
        OrganisationModule,
    ],
    controllers: [
        AdminAuthenticationController,
        EmployerAuthenticationController,
        ApplicantAuthenticationController,
        AuthenticationController,
    ],
    providers: [
        SessionService,
        AuthenticationService,
        AdminAuthenticationService,
        EmployerAuthenticationService,
        LocalStrategy,
        JwtStrategy,
        JwtRefreshTokenStrategy,
    ],
})
export class AuthenticationModule {}
