import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { SnackbarService } from "./snackbar/snackbar.service";
import { SnackbarType } from "./snackbar/snackbar-type.enum";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private snackbarService: SnackbarService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true,
    });

    return next.handle(request).pipe(
      catchError((err) => {
        if (!request.url.includes('/auth/user')) {
          let message: any;
          if (err.error) message = err.error.message;
          else { message = 'An Error Occurred' }

          this.snackbarService.show(message, SnackbarType.DANGER);
        }

        return throwError(err);
      })
    );
  }
}
