import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
})
export class RestaurantListComponent implements OnInit {
  restaurants: any[] = [];
 
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe(data => {
      this.restaurants = data;
    });
  }

  deleteRestaurant(id: string): void {
    this.restaurantService.deleteRestaurant(id).subscribe(() => {
      this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== id);
    });
  }
}