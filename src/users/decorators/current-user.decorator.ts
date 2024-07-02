import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
});
/* Order to run of this decorator
1. JwtGuard
2. CurrentUserInterceptor
3. Global Validation Pipe
4. @CurrentUser() decorator
5. Controller method
6. Serialize interceptor*/
