import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true,
    });

    return next.handle(request).pipe(
      catchError((err) => {
        if (
          (err.status === 401 || err.status === 403) &&
          !request.url.includes('/auth')
        ) {
          this.router.navigate(['login']);
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
