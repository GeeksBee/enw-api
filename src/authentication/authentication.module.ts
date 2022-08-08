import { Module } from "@nestjs/common";
import { UserModule } from "../modules/user/user.module";
import AdminService from "../modules/user/services/admin.service";
import SessionService from "./services/session.service";
import UserService from "../modules/user/services/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import Session from "./entities/session.entity";
import User from "../modules/user/entities/user.entity";
import AdminAuthenticationController from "./controllers/admin.auth.controller";
import AdminAuthenticationService from "./services/admin.auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([Session, User]), UserModule],
    controllers: [AdminAuthenticationController],
    providers: [SessionService, UserService, AdminService, AdminAuthenticationService],
})
export class AuthenticationModule {}
