import { UserProfile } from "./entities/user-profile.entity";
import { Injectable } from "@nestjs/common";
import { CreateUserProfileDto } from "./dto/create-user-profile.dto";
import { UpdateUserProfileDto } from "./dto/update-user-profile.dto";

@Injectable()
export class UserProfileService {
    async create(createUserProfileDto: CreateUserProfileDto) {
        const profile = UserProfile.create({
            ...createUserProfileDto,
            user: { id: createUserProfileDto.userId },
        });
        await profile.save();
        return profile;
    }

    async findAll() {
        const profiles = await UserProfile.find();
        return profiles;
    }

    async findOne(id: number) {
        const profile = await UserProfile.findOneOrFail(id);
        return profile;
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
