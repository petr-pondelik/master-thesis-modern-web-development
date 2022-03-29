import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LocationResponseHeaderInterceptor implements NestInterceptor {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((envelope) => {
        context.switchToHttp().getResponse().setHeader('Location', `${this.path}/${envelope.data.id}`);
      }),
    );
  }
}
