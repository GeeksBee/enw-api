import { Module } from "@nestjs/common";
import { UserProfileService } from "./user-profile.service";
import { UserProfileController } from "./user-profile.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProfile } from "./entities/user-profile.entity";
import { UserModule } from "../user/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([UserProfile]), UserModule],
    controllers: [UserProfileController],
    providers: [UserProfileService],
    exports: [UserProfileService],
})
export class UserProfileModule {}
