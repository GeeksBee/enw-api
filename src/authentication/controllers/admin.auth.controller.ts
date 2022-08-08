import { Body, Controller, Post } from "@nestjs/common";
import RegisterAdminDto from "../dtos/admin/registerAdmin.dto";
import AdminAuthenticationService from "../services/admin.auth.service";
import SessionService from "../services/session.service";

@Controller("authentication/admin")
export default class AdminAuthenticationController {
    constructor(
        private readonly sessionService: SessionService,
        private readonly adminAuthService: AdminAuthenticationService,
    ) {}

    @Post("register")
    public register(@Body() createAdminData: RegisterAdminDto) {
        return this.adminAuthService.registerAdmin(createAdminData);
    }
}
