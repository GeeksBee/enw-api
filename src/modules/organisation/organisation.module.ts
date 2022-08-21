import { Module } from "@nestjs/common";
import { OrganisationService } from "./organisation.service";
import { OrganisationController } from "./organisation.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import Organisation from "./entities/organisation.entity";
import { UserModule } from "../user/user.module";
import User from "../user/entities/user.entity";
import { OrganisationMedia } from "./entities/organisationMedia.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Organisation, User, OrganisationMedia]), UserModule],
    providers: [OrganisationService],
    controllers: [OrganisationController],
    exports: [OrganisationService],
})
export class OrganisationModule {}
