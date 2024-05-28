import { 
    CanActivate, 
    ExecutionContext, 
    Inject, 
    Injectable, 
    UnauthorizedException 
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import UserService from "src/user/user.service"; 
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export default class AuthGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;
  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      return false;
    }
    try {
      const payload = await this.userService.verifyToken(token);

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers['authorization'] ?? '';
    
    const [type, token] = authorization.split(' ') || [];

    if (type !== 'Bearer') {
      return;
    }

    return token;
  }
}