import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { apiTags } from "src/common/constants/swagger.constants";
import { JobService } from "src/modules/job/job.service";
import { OrganisationService } from "src/modules/organisation/organisation.service";
import UserService from "../services/user.service";

@Controller("user/admin")
export class AdminController {
    constructor(
        private readonly userService: UserService,
        private readonly orgService: OrganisationService,
        private readonly jobService: JobService,
    ) {}

    // @Post("user/bar/:userId")
    // public barUser() {
    //     const user = await this.userService.barUser();
    //     return;
    // }

    // @Post("user/unbar/:userId")
    // public unbarUser() {}

    @ApiTags(apiTags.Admin)
    @Get("get-data")
    async getData() {
        const organisationCount = await this.orgService.count();
        const jobCount = await this.jobService.countJob();
        const JobGroupCount = await this.jobService.countJobGroup();

        return {
            organisationCount,
            jobCount,
            JobGroupCount,
        };
    }
}
