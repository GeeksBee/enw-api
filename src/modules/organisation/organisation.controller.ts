import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/common/constants/swagger.constants";
import { OrganisationService } from "./organisation.service";

@Controller("organisation")
export class OrganisationController {
    constructor(private readonly organisationService: OrganisationService) {}

    @ApiTags(apiTags.Organisation)
    @Get("type")
    public getAllOrganisationTypes() {
        return this.organisationService.getAllOrganisationType();
    }

    @ApiTags(apiTags.Organisation)
    @Get("type/:typeId/attribute")
    public getAllOrganisationAttributes(@Param("typeId") typeId: number) {
        return this.organisationService.getAllOrganisationAttributes(typeId);
    }
}
