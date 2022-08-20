import { Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import JwtAuthenticationGuard from "src/authentication/guards/jwtAuthentication.guard";
import RoleGuard from "src/authentication/guards/role.guard";
import RequestWithUser from "src/authentication/interfaces/requestWithUser.interface";
import { apiTags } from "src/common/constants/swagger.constants";
import { UserRole } from "../user/entities/user.entity";
import { OrganisationService } from "./organisation.service";

@UseGuards(JwtAuthenticationGuard)
@Controller("organisation")
export class OrganisationController {
    constructor(private readonly organisationService: OrganisationService) {}

    @ApiTags(apiTags.Organisation)
    @Get("type")
    public getAllOrganisationTypes() {
        return this.organisationService.getAllOrganisationType();
    }
}
