import { Module } from "@nestjs/common";
import { OrganisationService } from "./organisation.service";
import { OrganisationController } from "./organisation.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import Organisation from "./entities/organisation.entity";
import OrganisationType from "./entities/organisationType.entity";
import OrganisationAttribute from "./entities/organisationAttribute.entity";
import OrganisationAttributeValue from "./entities/organisationAttributeValue.entity";
import { OrganisationMedia } from "./entities/organisationMedia.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Organisation,
            OrganisationType,
            OrganisationAttribute,
            OrganisationAttributeValue,
            OrganisationMedia,
        ]),
    ],
    providers: [OrganisationService],
    controllers: [OrganisationController],
})
export class OrganisationModule {}
