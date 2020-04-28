import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Visited} from '../modules/iface.module';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitedService {

  PHP_API_SERVER = 'http://alexei-math.ru';

  constructor(private httpClient: HttpClient) {
  }

  getVisited(page: string): Observable<Visited> {
    return this.httpClient.get<Visited>(`${this.PHP_API_SERVER}/php/api/visited.php`, {
      params: new HttpParams().set('page', page)
    });
  }
}
