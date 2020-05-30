import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpEvent} from '@angular/common/http';
import {AppFacade} from '../app.facade';
import {Observable} from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  apiUrl = 'https://alexei-math.ru/php';

  constructor(private appFacade: AppFacade) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUserJWT = this.appFacade.getCurrentUserJWT();
    const isLoggedIn = currentUserJWT && currentUserJWT.jwt;
    const isApiUrl = req.url.startsWith(this.apiUrl);
    if (isLoggedIn && isApiUrl) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUserJWT.jwt}`
        }
      });
    }

    return next.handle(req);
  }
}
