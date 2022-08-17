import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtAsyncConfig } from "src/config/jwt.config";
import { EmailService } from "./email.service";

@Module({
    imports: [JwtModule.registerAsync(JwtAsyncConfig)],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule {}
