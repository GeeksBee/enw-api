import { BaseInterfaceRepository } from "../../../common/base/repository.interface.base";
import User from "../entities/user.entity";

export interface UserRepositoryInterface extends BaseInterfaceRepository<User> {}
