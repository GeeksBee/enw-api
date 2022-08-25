import { UserProfile } from "src/modules/user-profile/entities/user-profile.entity";
import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common";
import { UserProfileService } from "./user-profile.service";
import { UpdateUserProfileDto } from "./dto/update-user-profile.dto";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/common/constants/swagger.constants";
import RoleGuard from "src/authentication/guards/role.guard";
import { UserRole } from "../user/entities/user.entity";
import RequestWithUser from "src/authentication/interfaces/requestWithUser.interface";
import { request } from "http";

@Controller("user-profile")
@ApiBearerAuth("Authorization")
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) {}

    @Get("")
    @ApiTags(apiTags.UserProfile)
    @UseGuards(RoleGuard([UserRole.APPLICANT]))
    public getUserProfile(@Req() request: RequestWithUser) {
        const user = request.user;
        console.log({ user });
        return this.userProfileService.getUserProfileByUserId(user.id);
    }

    @ApiTags(apiTags.UserProfile)
    @ApiBody({ type: UpdateUserProfileDto })
    @UseGuards(RoleGuard([UserRole.APPLICANT]))
    @Patch("")
    update(
        @Body() updateUserProfileDto: UpdateUserProfileDto,
        @Req() request: RequestWithUser,
    ): Promise<UserProfile> {
        const user = request.user;
        return this.userProfileService.updateUserProfile(user.id, updateUserProfileDto);
    }
}
