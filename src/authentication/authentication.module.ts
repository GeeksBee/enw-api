import { Module } from "@nestjs/common";
import { UserModule } from "src/modules/user/user.module";
import UserService from "src/modules/user/user.service";
import AuthenticationService from "./authentication.service";

@Module({
    imports: [UserModule],
    controllers: [],
    providers: [
        {
            provide: "AuthenticationServiceInterface",
            useClass: AuthenticationService,
        },
        {
            provide: "UserServiceInterface",
            useClass: UserService,
        },
    ],
})
export class AuthenticationModule {}
