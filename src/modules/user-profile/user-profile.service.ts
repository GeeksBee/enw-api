import { UserProfile } from "./entities/user-profile.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserProfileDto } from "./dto/create-user-profile.dto";
import { UpdateUserProfileDto } from "./dto/update-user-profile.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import UserService from "../user/services/user.service";

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfile)
        private readonly userProfileRepository: Repository<UserProfile>,
        private readonly userService: UserService,
    ) {}

    async createUserProfile(phone: string) {
        const user = await this.userService.getByPhone(phone);
        if (user) {
            const userProfile = this.userProfileRepository.create({ user });
            return this.userProfileRepository.save(userProfile);
        }
        throw new NotFoundException(`user with the phone ${phone} does not exist`);
    }

    public async updateUserProfile(userId: number, data: UpdateUserProfileDto) {
        const userProfile = await this.getUserProfileByUserId(userId);
        await this.userProfileRepository.update(userProfile.id, data);
        const updatedProfile = await this.userProfileRepository.findOne({
            where: { user: userId },
            relations: ["user"],
        });
        if (updatedProfile) return updatedProfile;
        throw new NotFoundException(`user-profile with the given id ${userProfile.id} not found`);
    }

    public async getUserProfileByUserId(userId: number) {
        return this.userProfileRepository.findOne({
            where: {
                user: userId,
            },
        });
    }

    async getAllUserProfiles() {
        return this.userProfileRepository.find();
    }

    async findOne(id: number) {
        return UserProfile.findOneOrFail(id);
    }

    async update(id: number, updateUserProfileDto: UpdateUserProfileDto) {
        let profile: any = await UserProfile.findOneOrFail(id);
        profile = {
            ...profile,
            ...updateUserProfileDto,
        };
        profile = await UserProfile.save(profile);
        return profile;
    }

    async remove(id: number) {
        const profile = await UserProfile.findOneOrFail(id);
        await profile.softRemove();
        return profile;
    }
}
