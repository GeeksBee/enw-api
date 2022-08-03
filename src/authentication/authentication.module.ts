import { Module } from "@nestjs/common";
import { UserModule } from "src/modules/user/user.module";
import AdminService from "../modules/user/services/admin.service";

@Module({
    imports: [UserModule],
    controllers: [],
    providers: [
        {
            provide: "AdminServiceInterface",
            useClass: AdminService,
        },
    ],
})
export class AuthenticationModule {}
