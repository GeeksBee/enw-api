import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { ErrorResponseDto } from "src/common/responseSchemas/errorResponseSchema";
export const ApiErrorResponse = (code: number) => {
    return applyDecorators(
        ApiResponse({
            status: code,
            type: ErrorResponseDto,
        }),
    );
};
