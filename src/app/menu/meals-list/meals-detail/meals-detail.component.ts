import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

import { MealId } from 'src/app/models/meal-id';
import { MenuService } from 'src/app/sevices/menu.service';

@Component({
  selector: 'app-meals-detail',
  templateUrl: './meals-detail.component.html',
  styleUrls: ['./meals-detail.component.scss'],
})
export class MealsDetailComponent implements OnInit {
  meal: MealId[] = [];
  id = '';
  ingredients: string[] = [];
  mealId!: MealId;

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mealDetails();
  }

  mealDetails() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.id = params['id'];

          return this.menuService.getMealById(this.id);
        })
      )
      .subscribe((meal: MealId[]): void => {
        this.ingredients = [];

        this.meal = meal;
        this.mealId = meal[0];

        this.listIngredients();
      });
  }

  listIngredients() {
    for (let i = 1; i < Object.keys(this.mealId).length; i++) {
      let ingredient: any;
      if (
        this.mealId[`strMeasure${i}` as keyof typeof this.mealId] !== null &&
        this.mealId[`strMeasure${i}` as keyof typeof this.mealId] !==
          undefined &&
        this.mealId[`strIngredient${i}` as keyof typeof this.mealId] !== null &&
        this.mealId[`strIngredient${i}` as keyof typeof this.mealId] !== ''
      ) {
        ingredient = `${
          this.mealId[`strMeasure${i}` as keyof typeof this.mealId]
        } of ${this.mealId[`strIngredient${i}` as keyof typeof this.mealId]}`;

        this.ingredients.push(ingredient);
      }
    }
  }

  deleteMeal(id: string) {
    if (confirm('Are you sure you want to delete? ')) {
      this.menuService.deleteMeal(id).subscribe();
    }
  }
}
