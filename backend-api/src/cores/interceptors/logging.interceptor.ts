import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const handler = context.getHandler();
        const controller = context.getClass();
        // Log controller and method names
        this.logger.verbose(`\n`);
        this.logger.verbose(`Controller: ${controller.name}`);
        this.logger.verbose(`Method: ${handler.name}`);

        return next.handle();
    }
}
