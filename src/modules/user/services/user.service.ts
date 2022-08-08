import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import EmailAlreadyVerified from "src/common/exceptions/emailAlreadyVerified.exception";
import { DeleteResult, Repository } from "typeorm";
import User from "../entities/user.entity";

@Injectable()
export default class UserService {
    constructor(@InjectRepository(User) protected readonly userRepository: Repository<User>) {}

    public getById(userId: number): Promise<User> {
        return this.userRepository.findOne(userId);
    }
    public getByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ email });
    }
    public getByPhone(phone: string): Promise<User> {
        return this.userRepository.findOne({ phone });
    }

    public async verifyEmail(userId: number): Promise<User> {
        const user = await this.userRepository.findOne(userId);
        if (!user.isEmailConfirmed) {
            user.isEmailConfirmed = true;
            return this.userRepository.save(user);
        } else {
            throw new EmailAlreadyVerified();
        }
    }
    public async verifyPhone(userId: number): Promise<User> {
        const user = await this.userRepository.findOne(userId);
        if (!user.isPhoneConfirmed) {
            user.isPhoneConfirmed = true;
            return this.userRepository.save(user);
        } else {
            throw new EmailAlreadyVerified();
        }
    }

    public remove(userId: number): Promise<DeleteResult> {
        return this.userRepository.delete(userId);
    }
}
