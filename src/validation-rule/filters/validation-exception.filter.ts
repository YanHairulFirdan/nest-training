import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(BadRequestException)
export default class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx      = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request  = ctx.getRequest<Request>();
        const exceptionResponse = exception.getResponse();

        const errorPayload = typeof exceptionResponse === 'string'
            ? exception.getResponse()
            : {
                status_code: HttpStatus.UNPROCESSABLE_ENTITY,
                message: "Unprocessable Entity",
                errors: this.parseErrors(exceptionResponse['message'], request),
            };

        response.status(HttpStatus.UNPROCESSABLE_ENTITY).json(errorPayload);
    };

    parseErrors(validationMessages: string[], request: Request) {
        const errors: Record<string, string> = {};

        validationMessages.forEach((error: string) => {
            const [property, ...constraints] = error.split(' ');
            
            if (!errors[property]) {
                constraints.unshift(property);
                errors[property] = constraints.join(' ');
            }
        });

       return errors;
    }
}