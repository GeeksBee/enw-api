import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./controllers/admin.controller";
import { ApplicantController } from "./controllers/applicant.controller";
import { EmployerController } from "./controllers/employer.controller";
import User from "./entities/user.entity";
import AdminService from "./services/admin.service";
import ApplicantService from "./services/applicant.service";
import EmployerService from "./services/employer.service";
import UserService from "./services/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, AdminService, EmployerService, ApplicantService],
    exports: [UserService, AdminService, EmployerService, ApplicantService],
    controllers: [AdminController, EmployerController, ApplicantController],
})
export class UserModule {}
