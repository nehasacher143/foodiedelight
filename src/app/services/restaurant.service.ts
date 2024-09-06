import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<any> {
    return this.http.get(environment.apiUrl);
  }

  getRestaurantById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${id}`);
  }

  createRestaurant(restaurant: any): Observable<any> {
    return this.http.post(environment.apiUrl, restaurant);
  }

  updateRestaurant(id: string, restaurant: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${id}`, restaurant);
  }

  deleteRestaurant(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${id}`);
  }
}