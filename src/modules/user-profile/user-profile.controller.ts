import { UserProfile } from "src/modules/user-profile/entities/user-profile.entity";
import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UserProfileService } from "./user-profile.service";
import { CreateUserProfileDto } from "./dto/create-user-profile.dto";
import { UpdateUserProfileDto } from "./dto/update-user-profile.dto";

@Controller("user-profile")
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) {}

    @Post()
    create(@Body() createUserProfileDto: CreateUserProfileDto): Promise<UserProfile> {
        return this.userProfileService.create(createUserProfileDto);
    }

    @Get()
    findAll(): Promise<UserProfile[]> {
        return this.userProfileService.findAll();
    }

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
