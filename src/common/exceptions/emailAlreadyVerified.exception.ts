import { BadRequestException } from "@nestjs/common";

export default class EmailAlreadyVerified extends BadRequestException {
    constructor() {
        super("Email already verified");
    }
}
