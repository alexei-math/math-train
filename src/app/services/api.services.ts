import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {QTask, SimpleTask, Visited} from '../modules/iface.module';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServices {

  PHP_API_SERVER = 'https://alexei-math.ru';
  // PHP_API_SERVER = 'http://localhost';

  constructor(private httpClient: HttpClient) {
  }

  getVisited(page: string): Observable<Visited> {
    return this.httpClient.get<Visited>(`${this.PHP_API_SERVER}/php/api/visited.php`, {
      params: new HttpParams().set('page', page)
    });
  }

  getLinearEquation(level: string): Observable<SimpleTask> {
    return this.httpClient.get<SimpleTask>(`${this.PHP_API_SERVER}/php/api/linearEquation.php`, {
      params: new HttpParams().set('level', level)
    });
  }

  getMultiplyTable(): Observable<SimpleTask> {
    return this.httpClient.get<SimpleTask>(`${this.PHP_API_SERVER}/php/api/multiplyTable.php`);
  }

  getGroupQ(level: string): Observable<QTask> {
    return this.httpClient.get<QTask>(`${this.PHP_API_SERVER}/php/api/groupQ.php`, {
      params: new HttpParams().set('level', level)
    });
  }
}
