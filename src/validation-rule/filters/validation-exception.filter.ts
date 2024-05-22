import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(BadRequestException)
export default class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx      = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request  = ctx.getRequest<Request>();
        const status   = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        const errorPayload = typeof exceptionResponse === 'string'
            ? exception.getResponse()
            : {
                status_code: HttpStatus.UNPROCESSABLE_ENTITY,
                message: "Unprocessable Entity",
                errors: this.parseErrors(exceptionResponse['message'], request),
            };

        response.status(status).json(errorPayload);
    };

    parseErrors(validationMessages: string[], request: Request) {
        const errors = {};

        Object.keys(request.body).forEach((key) => {
            const error: string = validationMessages.find((message) => message.includes(key));
            if (error) {
                errors[key] = error;
            }
        });

        return errors;
    }
}