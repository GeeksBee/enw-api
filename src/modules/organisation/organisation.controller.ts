import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import JwtAuthenticationGuard from "src/authentication/guards/jwtAuthentication.guard";
import RoleGuard from "src/authentication/guards/role.guard";
import RequestWithUser from "src/authentication/interfaces/requestWithUser.interface";
import { apiTags } from "src/common/constants/swagger.constants";
import { UserRole } from "../user/entities/user.entity";
import { UpdateOrganisationDto } from "./dtos/update-org.dto";
import { OrganisationService } from "./organisation.service";

@Controller("organisation")
export class OrganisationController {
    constructor(private readonly organisationService: OrganisationService) {}

    @ApiTags(apiTags.Organisation)
    @Get("type")
    @UseGuards(RoleGuard([UserRole.EMPLOYER]))
    public getAllOrganisationTypes() {
        return this.organisationService.getAllOrganisationType();
    }

    @Get("")
    @ApiTags(apiTags.Organisation)
    @UseGuards(RoleGuard([UserRole.EMPLOYER]))
    public getOrganisation(@Req() request: RequestWithUser) {
        const user = request.user;
        console.log({ user });
        return this.organisationService.getOrganisationByUserId(user.id);
    }

    @ApiTags(apiTags.Organisation)
    @ApiBody({ type: UpdateOrganisationDto })
    @UseGuards(RoleGuard([UserRole.EMPLOYER]))
    @Patch()
    public updateOrganisation(
        @Body() updateOrgDto: UpdateOrganisationDto,
        @Req() request: RequestWithUser,
    ) {
        const user = request.user;
        return this.organisationService.updateOrganisation(user.id, updateOrgDto);
    }
}
