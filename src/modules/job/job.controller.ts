import { FileInterceptor } from "@nestjs/platform-express";
import { apiTags } from "src/common/constants/swagger.constants";
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Res,
} from "@nestjs/common";
import { JobService } from "./job.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import RoleGuard from "src/authentication/guards/role.guard";
import { UserRole } from "../user/entities/user.entity";
import RequestWithUser from "src/authentication/interfaces/requestWithUser.interface";
import { JobFilterDto } from "./dto/filter-dto";
import { multerConfig } from "src/config/module.config";
import { JobGroupDto } from "./dto/job-group-dto";
import { createReadStream } from "fs";
import { join } from "path";
import JwtAuthenticationGuard from "src/authentication/guards/jwtAuthentication.guard";

@Controller("job")
@ApiTags(apiTags.Job)
export class JobController {
    constructor(private readonly jobService: JobService) {}

    @Post()
    @UseGuards(RoleGuard([UserRole.EMPLOYER]))
    create(@Body() createJobDto: CreateJobDto, @Req() request: Request) {
        // console.log("employer user ", request.user);
        return this.jobService.create(createJobDto);
    }

    @Get("filter")
    async filterJobs(@Body() body: JobFilterDto) {
        return this.jobService.filterJobs(body);
    }

    @Post("upload")
    @UseInterceptors(FileInterceptor("file", multerConfig))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);

        return file;
    }

    @Get("download/:name")
    getFile(@Res() res: Response, @Param("name") name: string) {
        const file = createReadStream(join(process.cwd(), `/uploads/${name}`));
        return file.pipe(res);
    }

    @Post("group")
    @UseGuards(JwtAuthenticationGuard)
    async createJobGroup(@Body() body: JobGroupDto, @Req() request: RequestWithUser) {
        return this.jobService.createJobGroup(body, request.user);
    }

    @Get("group/incomplete")
    async findIncompleteJobGroups() {
        return this.jobService.findIncompleteJobGroups();
    }

    @Get("search/:search")
    async search(@Param("search") search: string) {
        return this.jobService.search(search);
    }

    @Get()
    findAll() {
        return this.jobService.findAll();
    }

    @Get("skill")
    findAllSkills() {
        return this.jobService.findAllSkills();
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
