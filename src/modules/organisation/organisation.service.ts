import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Organisation from "./entities/organisation.entity";
import OrganisationAttribute from "./entities/organisationAttribute.entity";
import OrganisationAttributeValue from "./entities/organisationAttributeValue.entity";
import OrganisationType from "./entities/organisationType.entity";

@Injectable()
export class OrganisationService {
    constructor(
        @InjectRepository(Organisation)
        protected readonly organisationRepository: Repository<Organisation>,
        @InjectRepository(OrganisationType)
        protected readonly organisationTypeRepository: Repository<OrganisationType>,
        @InjectRepository(OrganisationAttribute)
        protected readonly organisationAttributeRepository: Repository<OrganisationAttribute>,
        @InjectRepository(OrganisationAttributeValue)
        protected readonly organisationAttributeValueRepository: Repository<OrganisationAttributeValue>,
    ) {}

    public getAllOrganisationType() {
        return this.organisationTypeRepository.find();
    }

    public async getAllOrganisationAttributes(organisationTypeId: number) {
        const data = await this.organisationTypeRepository.findOne({
            where: {
                id: organisationTypeId,
            },
            relations: ["organisationAttributes"],
        });
        const organisationAttributes = data.organisationAttributes.map((item) => ({
            value: item.id,
            option: item.name,
        }));
        return { ...data, organisationAttributes };
    }
}
