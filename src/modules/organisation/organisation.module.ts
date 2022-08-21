import { Module } from "@nestjs/common";
import { OrganisationService } from "./organisation.service";
import { OrganisationController } from "./organisation.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import Organisation from "./entities/organisation.entity";
import { OrganisationMedia } from "./entities/organisationMedia.entity";
import { UserModule } from "../user/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([Organisation, OrganisationMedia]), UserModule],
    providers: [OrganisationService],
    controllers: [OrganisationController],
    exports: [OrganisationService],
})
export class OrganisationModule {}
