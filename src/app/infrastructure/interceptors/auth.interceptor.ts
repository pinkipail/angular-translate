import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { AuthHttpService } from '../services/auth-http.service';
import { IAM_TOKEN_KEY } from '../consts/iam-token-key.const';
import { IAMTokenInfo as IAMTokenInfo } from '../types/iam-token-response.type';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private set iamTokenInfo(res: IAMTokenInfo) {
    localStorage.setItem(IAM_TOKEN_KEY, JSON.stringify(res));
  }

  private get iamTokenInfo(): IAMTokenInfo {
    return JSON.parse(localStorage.getItem(IAM_TOKEN_KEY));
  }

  constructor(private authHttpService: AuthHttpService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.sendRequest(request, next)
      .pipe(
        catchError((err: Error) => {
          if (this.isNotAuthorized(err)) {
            return this.updateIAMToken()
              .pipe(
                mergeMap(() => this.sendRequest(request, next))
              );
          }
          return throwError(err);
        }),
      );
  }

  private sendRequest(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const iamToken = this.iamTokenInfo?.iamToken;
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${iamToken}`
      }
    });
    return next.handle(request);
  }

  private updateIAMToken(): Observable<IAMTokenInfo> {
    return this.authHttpService
      .getIAMToken()
      .pipe(
        tap(res => this.iamTokenInfo = res)
      );
  }

  private isNotAuthorized(error: Error): boolean {
    return (error instanceof HttpErrorResponse && error.status === 401);
  }

}

export const AUTH_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
  deps: [AuthHttpService]
};
