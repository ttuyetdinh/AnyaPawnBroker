import {
    CallHandler,
    ExecutionContext,
    NestInterceptor,
    UseInterceptors,
} from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

// decorator
export function Serialize<T>(dto: ClassConstructor<T>) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor<T> implements NestInterceptor {
    constructor(private dto: ClassConstructor<T>) {}
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: T) => {
                return plainToClass(this.dto, data, {
                    // override the default behavior of class-transformer
                    excludeExtraneousValues: true, // only props that has an @exposed() decorator will be included in the response
                });
            }),
        );
    }
}
