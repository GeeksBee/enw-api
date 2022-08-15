import { UserRole } from "src/modules/user/entities/user.entity";
import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";
import RequestWithUser from "../interfaces/requestWithUser.interface";

const RoleGuard = (role: UserRole): Type<CanActivate> => {
    class RoleGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext): boolean {
            const request = context.switchToHttp().getRequest<RequestWithUser>();
            const user = request.user;
            return user?.role == role;
        }
    }
    return mixin(RoleGuardMixin);
};

export default RoleGuard;
