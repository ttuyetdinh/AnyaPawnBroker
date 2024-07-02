import { AuthGuard } from '@nestjs/passport';

// create a guard that extends AuthGuard and uses the jwt strategy
export class JwtGuard extends AuthGuard('jwt') {}
