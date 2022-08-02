import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "./entities/user.entity";
import { UserRepository } from "./user.repository";
import UserService from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        {
            provide: "UserRepositoryInterface",
            useClass: UserRepository,
        },
        {
            provide: "UserServiceInterface",
            useClass: UserService,
        },
    ],
    exports: [
        {
            provide: "UserRepositoryInterface",
            useClass: UserRepository,
        },
        {
            provide: "UserServiceInterface",
            useClass: UserService,
        },
    ],
})
export class UserModule {}
