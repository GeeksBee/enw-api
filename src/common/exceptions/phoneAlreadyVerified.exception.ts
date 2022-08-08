import { BadRequestException } from "@nestjs/common";

export default class PhoneAlreadyVerified extends BadRequestException {
    constructor() {
        super("Phone already verified");
    }
}
