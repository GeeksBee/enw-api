import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags("Server Health")
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get("/healthCheck")
    getHello(): object {
        return this.appService.getHello();
    }
}
