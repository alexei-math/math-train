import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User, UserJWT} from '../modules/iface.module';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private  currentUserSubject: BehaviorSubject<UserJWT>;
  public currentUser: Observable<UserJWT>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserJWT>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserJWT {
    return this.currentUserSubject.value;
  }

  login(logname: string, password: string) {
    return this.http.post<UserJWT>('http://localhost/php/authentication/api/login.php', {logname, password})
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
