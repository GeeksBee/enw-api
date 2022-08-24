import { UserProfile } from "src/modules/user-profile/entities/user-profile.entity";
import { Controller, Get, Body, Patch, Param, Delete } from "@nestjs/common";
import { UserProfileService } from "./user-profile.service";
import { UpdateUserProfileDto } from "./dto/update-user-profile.dto";
import { ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/common/constants/swagger.constants";

@Controller("user-profile")
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) {}

    // create -> when user phone is verified
    // update applicant

    //     @ApiTags(apiTags.UserProfile)
    // updateUserProfile():

    @Get(":id")
    findOne(@Param("id") id: string): Promise<UserProfile> {
        return this.userProfileService.findOne(+id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateUserProfileDto: UpdateUserProfileDto,
    ): Promise<UserProfile> {
        return this.userProfileService.update(+id, updateUserProfileDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string): Promise<UserProfile> {
        return this.userProfileService.remove(+id);
    }
}
