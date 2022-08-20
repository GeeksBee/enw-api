import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Organisation from "./entities/organisation.entity";

import { organisationTypes } from "./entities/organisationType.enum";

@Injectable()
export class OrganisationService {
    constructor(
        @InjectRepository(Organisation)
        protected readonly organisationRepository: Repository<Organisation>,
    ) {}

    public getAllOrganisationType() {
        return organisationTypes;
    }
}
