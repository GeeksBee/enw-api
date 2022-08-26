import { Module } from "@nestjs/common";
import { UserProfileService } from "./user-profile.service";
import { UserProfileController } from "./user-profile.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProfile } from "./entities/user-profile.entity";
import { UserModule } from "../user/user.module";
import { Remainder } from "./entities/remainder.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserProfile, Remainder]), UserModule],
    controllers: [UserProfileController],
    providers: [UserProfileService],
    exports: [UserProfileService],
})
export class UserProfileModule {}
