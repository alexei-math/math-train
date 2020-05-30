import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User, UserJWT} from '../modules/iface.module';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AppFacade} from '../app.facade';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private http: HttpClient,
              private appFacade: AppFacade) {
    this.appFacade.setCurrentUserJWT(JSON.parse(localStorage.getItem('currentUser')));
  }

  public get currentUserValue(): UserJWT {
    return  this.appFacade.getCurrentUserJWT();
  }

  login(logname: string, password: string) {
    return this.http.post<UserJWT>('http://localhost/php/authentication/api/login.php', {logname, password})
      .pipe(map(userJWT => {
        localStorage.setItem('currentUser', JSON.stringify(userJWT));
        this.appFacade.setCurrentUserJWT(userJWT);
        const dataArr = userJWT.jwt.split('.')[1];
        const decodedJWT = decodeURIComponent(escape(window.atob(dataArr)));
        const payload = JSON.parse(decodedJWT);
        this.appFacade.setCurrentUser(payload);
        return userJWT;
      }));
  }
}
