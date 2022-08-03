import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "./entities/user.entity";
import { UserRepository } from "./user.repository";
import AdminService from "./services/admin.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        {
            provide: "UserRepositoryInterface",
            useClass: UserRepository,
        },
        {
            provide: "AdminServiceInterface",
            useClass: AdminService,
        },
    ],
    exports: [
        {
            provide: "UserRepositoryInterface",
            useClass: UserRepository,
        },
        {
            provide: "AdminServiceInterface",
            useClass: AdminService,
        },
    ],
})
export class UserModule {}
