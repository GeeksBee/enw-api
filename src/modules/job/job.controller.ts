import { apiTags } from "src/common/constants/swagger.constants";
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from "@nestjs/common";
import { JobService } from "./job.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import RoleGuard from "src/authentication/guards/role.guard";
import { UserRole } from "../user/entities/user.entity";
import RequestWithUser from "src/authentication/interfaces/requestWithUser.interface";

@Controller("job")
@ApiTags(apiTags.Job)
export class JobController {
    constructor(private readonly jobService: JobService) {}

    @Post()
    @UseGuards(RoleGuard([UserRole.EMPLOYER]))
    create(@Body() createJobDto: CreateJobDto, @Req() request: RequestWithUser) {
        console.log("employer user ", request.user);
        return this.jobService.create(createJobDto);
    }

    @Get()
    findAll() {
        return this.jobService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: number, @Req() request: Request) {
        await this.jobService.incrementView(id);
        console.log(request);
        return this.jobService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateJobDto: UpdateJobDto) {
        return this.jobService.update(+id, updateJobDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.jobService.remove(+id);
    }
}
