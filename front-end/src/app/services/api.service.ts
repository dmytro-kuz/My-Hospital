import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private http: HttpClient) {}
  url: string = 'http://localhost:3000/api/';

  postApi(data: any, route: string) {
      return this.http
      .post(this.url + route, data)
  }

  getApi(route: string) {
    return this.http
      .get<any>(this.url + route)
       }

  deleteApi(route: string, id?: string ) {
    return this.http
      .delete(this.url + route + '/' + id)
  }

  putApi(data: any, id?: string,  route?: string) {
    return this.http
    .put(this.url + route + '/' + id, data)
  }
}
