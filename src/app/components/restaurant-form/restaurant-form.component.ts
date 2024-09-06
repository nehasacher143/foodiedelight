import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {
  restaurantForm: FormGroup;
  isEditMode = false;
  restaurantId: string | null = null;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.restaurantForm = new FormGroup({
      name: new FormControl(null,[Validators.required]),
      description: new FormControl(null,[Validators.required]),
      location: new FormControl(null,[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
    if (this.restaurantId) {
      this.isEditMode = true;
      this.restaurantService.getRestaurantById(this.restaurantId).subscribe(data => {
        this.restaurantForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.restaurantId) {
      this.restaurantService.updateRestaurant(this.restaurantId, this.restaurantForm.value).subscribe(() => {
        this.router.navigate(['/restaurants']);
      });
    } else {
      this.restaurantService.createRestaurant(this.restaurantForm.value).subscribe(() => {
        this.router.navigate(['/restaurants']);
      });
    }
  }
}
