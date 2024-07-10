import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { map, Observable } from 'rxjs';

// decorator
export function DateTransformToLocal() {
    return UseInterceptors(new DateTransformInterceptor());
}

export class DateTransformInterceptor implements NestInterceptor {
    constructor() {}

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data) => {
                return this.transformDate(data);
            }),
        );
    }

    transformDate(obj: any): any {
        if (obj instanceof Date) {
            return obj.toLocaleString();
        }
        if (typeof obj === 'object') {
            for (const key in obj) {
                obj[key] = this.transformDate(obj[key]);
            }
        }

        return obj;
    }
}
