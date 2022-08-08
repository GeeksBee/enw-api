import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import UserService from "src/modules/user/services/user.service";
import { Repository } from "typeorm";
import Session from "../entities/session.entity";

@Injectable()
export default class SessionService {
    constructor(
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
        private readonly userService: UserService,
    ) {}

    public async createSession(userId: number): Promise<Session> {
        // user validity check will be down using guards
        const user = await this.userService.getById(userId);
        if (user) {
            const session = this.sessionRepository.create({ user });
            return this.sessionRepository.save(session);
        } else {
            throw new NotFoundException(`user with the userId ${userId} not found`);
        }
    }
    public findSessionById(sessionId: number): Promise<Session> {
        return this.sessionRepository.findOne(sessionId);
    }
    public async invalidateRefreshToken(sessionId: number): Promise<Session> {
        const session = await this.sessionRepository.findOne(sessionId);
        session.valid = false;
        return this.sessionRepository.save(session);
    }
}
