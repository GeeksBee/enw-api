import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import User from "../../modules/user/entities/user.entity";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger("HTTP");
    use(req: Request & { user: any }, res: Response, next: NextFunction) {
        res.on("finish", () => {
            const { method, originalUrl } = req;
            const { statusCode, statusMessage } = res;
            const message = `${method} ${originalUrl} ${statusCode} ${statusMessage} ${
                req.user ? "<user: " + (req.user as User).email + ">" : ""
            }`;

            if (statusCode >= 500) {
                return this.logger.error(message, undefined, "HTTP");
            }

            if (statusCode >= 400) {
                return this.logger.warn(message);
            }

            return this.logger.log(message);
        });
        next();
    }
}
