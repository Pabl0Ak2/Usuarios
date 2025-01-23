import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  http = inject(HttpClient);
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.slice(0, 6))
    );
  }
}
