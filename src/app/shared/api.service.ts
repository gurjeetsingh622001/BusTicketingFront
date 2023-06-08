import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

function _window(): any {
  // return the global native browser window object
  return window
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  api: String = 'http://localhost:5200/user/'

  getBuses() {
    return this.http.get(this.api + 'getBuses')
  }

  getRoutes() {
    return this.http.get(this.api + 'getRoutes')
  }

  getSearchResults(form: any) {
    return this.http.post(this.api + 'searchRoutes1', form)
  }

  // payment

  get nativeWindow(): any {
    return _window
  }

  // payment



}
