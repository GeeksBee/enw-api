import { UserRole } from "src/modules/user/entities/user.entity";
import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import JwtAuthenticationGuard from "./jwtAuthentication.guard";

const RoleGuard = (roles: UserRole[]): Type<CanActivate> => {
    class RoleGuardMixin extends JwtAuthenticationGuard {
        async canActivate(context: ExecutionContext): Promise<boolean> {
            await super.canActivate(context);
            const request = context.switchToHttp().getRequest<RequestWithUser>();
            const user = request.user;
            return roles.filter((role: UserRole) => user.role === role).length !== 0;
        }
    }
    return mixin(RoleGuardMixin);
};

export default RoleGuard;
