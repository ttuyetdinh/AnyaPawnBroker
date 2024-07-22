import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { JwtStrategy } from './jwt.strategy';

// Currently is not use
// purpose of this file is to export all strategies in one place
// then make the import become shorter
// ex: import { JwtStrategy, AbcStrategy } from './strategies/index-strategy';
export { JwtRefreshStrategy, JwtStrategy };
