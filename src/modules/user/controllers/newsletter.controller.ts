import {
    Controller,
    Get,
    Param,
    Post,
    Res,
    StreamableFile,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { createReadStream } from "fs";
import { join } from "path";
import { apiTags } from "src/common/constants/swagger.constants";
import { multerConfig } from "src/config/module.config";
import { JobService } from "src/modules/job/job.service";
import { OrganisationService } from "src/modules/organisation/organisation.service";
import NewsletterService from "../services/newsletter.service";
import UserService from "../services/user.service";

@ApiTags(apiTags.Newsletter)
@Controller("user/admin/newsletter")
export class NewsletterController {
    constructor(
        private readonly userService: UserService,
        private readonly orgService: OrganisationService,
        private readonly jobService: JobService,
        private readonly nsService: NewsletterService,
    ) {}

    @Post("upload")
    @UseInterceptors(FileInterceptor("file", multerConfig))
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    })
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
        const ns = await this.nsService.createNewsletter(file.filename);
        return { file, newsletter: ns };
    }

    @Get("download/:name")
    getFile(@Res() res: Response, @Param("name") name: string) {
        const file = createReadStream(join(process.cwd(), `/uploads/${name}`));
        return file.pipe(res);
    }
}
