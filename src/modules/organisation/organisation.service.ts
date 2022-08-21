import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import UserService from "../user/services/user.service";
import Organisation from "./entities/organisation.entity";

import { organisationTypes } from "./entities/organisationType.enum";

@Injectable()
export class OrganisationService {
    constructor(
        @InjectRepository(Organisation)
        protected readonly organisationRepository: Repository<Organisation>,
        private readonly userService: UserService,
    ) {}

    public async createOrganisation(userId: number) {
        const user = await this.userService.getById(userId);
        if (user) {
            const organisation = this.organisationRepository.create({ user });
            return this.organisationRepository.save(organisation);
        }
        throw new NotFoundException(`user with the user id ${userId} does not exist`);
    }

    public getAllOrganisationType() {
        return organisationTypes;
    }
}
