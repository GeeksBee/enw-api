import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { userPrivateFields } from "../user/entities/user.entity";
import UserService from "../user/services/user.service";
import { UpdateOrganisationDto } from "./dtos/update-org.dto";
import Organisation from "./entities/organisation.entity";
import { omit } from "lodash";

import { organisationTypes } from "./entities/organisationType.enum";

@Injectable()
export class OrganisationService {
    constructor(
        @InjectRepository(Organisation)
        protected readonly organisationRepository: Repository<Organisation>,
        private readonly userService: UserService,
    ) {}

    public findAll() {
        return this.organisationRepository.find();
    }

    public async createOrganisation(email: string) {
        const user = await this.userService.getByEmail(email);
        if (user) {
            const organisation = this.organisationRepository.create({ user });
            return this.organisationRepository.save(organisation);
        }
        throw new NotFoundException(`user with the email ${email} does not exist`);
    }

    public async updateOrganisation(userId: number, data: UpdateOrganisationDto) {
        const org = await this.getOrganisationByUserId(userId);
        await this.organisationRepository.update(org.id, data);
        const updatedOrg = await this.organisationRepository.findOne({
            where: { user: userId },
            relations: ["user"],
        });
        const user = updatedOrg.user;
        if (updatedOrg) return { ...updatedOrg, user: omit(user, userPrivateFields) };
        throw new NotFoundException(`organisation with the given id ${org.id} not found`);
    }

    public getOrganisationById(id: number) {
        return this.organisationRepository.findOne(id);
    }

    public getOrganisationByUserId(userId: number) {
        return this.organisationRepository.findOneOrFail({
            where: {
                user: { id: userId },
            },
        });
    }

    public getAllOrganisationType() {
        return organisationTypes;
    }
}
