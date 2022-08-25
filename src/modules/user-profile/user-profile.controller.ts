import { UserProfile } from "src/modules/user-profile/entities/user-profile.entity";
import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common";
import { UserProfileService } from "./user-profile.service";
import { UpdateUserProfileDto } from "./dto/update-user-profile.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/common/constants/swagger.constants";
import RoleGuard from "src/authentication/guards/role.guard";
import { UserRole } from "../user/entities/user.entity";
import RequestWithUser from "src/authentication/interfaces/requestWithUser.interface";

@Controller("user-profile")
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) {}

    // @UseGuards(RoleGuard([UserRole.APPLICANT]))
    // @ApiTags(apiTags.UserProfile)
    // @Get("")
    // getUserProfile(@Req() request: RequestWithUser): Promise<UserProfile> {
    //     return
    // }

    @ApiTags(apiTags.UserProfile)
    @ApiBody({ type: UpdateUserProfileDto })
    @UseGuards(RoleGuard([UserRole.APPLICANT]))
    @Patch("")
    update(
        @Param("id") id: string,
        @Body() updateUserProfileDto: UpdateUserProfileDto,
    ): Promise<UserProfile> {
        return this.userProfileService.update(+id, updateUserProfileDto);
    }
}
