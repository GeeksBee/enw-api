import { Controller, Get, Post } from "@nestjs/common";
import UserService from "../services/user.service";

@Controller("user/admin")
export class AdminController {
    constructor(private readonly userService: UserService) {}

    // @Post("user/bar/:userId")
    // public barUser() {
    //     const user = await this.userService.barUser();
    //     return;
    // }

    // @Post("user/unbar/:userId")
    // public unbarUser() {}

    @Get("")
    getData();
}
