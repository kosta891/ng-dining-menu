import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MenuService } from 'src/app/sevices/menu.service';
import { MealId } from 'src/app/models/meal-id';

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.component.html',
})
export class EditMealComponent implements OnInit {
  editMode = false;
  ingredients: string[] = [];
  id = '';
  meal: MealId[] = [];
  mealId!: MealId;

  mealForm: FormGroup = new FormGroup({
    idMeal: new FormControl('', Validators.required),
    strMeal: new FormControl('', Validators.required),
    imgPath: new FormControl('', Validators.required),
    strArea: new FormControl('', Validators.required),
    strCategory: new FormControl('', Validators.required),
    strIngredient: new FormControl([], Validators.required),
    strInstructions: new FormControl('', Validators.required),
    strYoutube: new FormControl('', Validators.required),
  });

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.mealDetails();
    });
  }

  mealDetails() {
    if (this.editMode) {
      let id = '';
      let name = '';
      let imgPath = '';
      let area = '';
      let category = '';
      let instructions = '';
      let link = '';

      if (this.editMode) {
        this.menuService.getMealById(this.id).subscribe((meal: MealId[]) => {
          this.mealId = meal[0];
          this.meal = meal;
          this.listIngredients();

          id = this.meal[0].idMeal;
          name = this.meal[0].strMeal;
          imgPath = this.meal[0].strMealThumb;
          area = this.meal[0].strArea;
          category = this.meal[0].strCategory;
          instructions = this.meal[0].strInstructions;
          link = this.meal[0].strYoutube || 'undefined';

          this.mealForm = new FormGroup({
            idMeal: new FormControl(id, Validators.required),
            strMeal: new FormControl(name, Validators.required),
            imgPath: new FormControl(imgPath, Validators.required),
            strArea: new FormControl(area, Validators.required),
            strCategory: new FormControl(category, Validators.required),
            strInstructions: new FormControl(instructions, Validators.required),
            strYoutube: new FormControl(link, Validators.required),
            strIngredient: new FormControl(
              this.ingredients,
              Validators.required
            ),
          });
        });
      }
    }
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

  submitForm(form: FormGroup) {
    if (this.editMode) {
      this.menuService.updateMeal(form.value.idMeal, form.value).subscribe();
    } else {
      this.menuService.addMeal(form.value.idMeal, form.value).subscribe();
    }
    this.back();
  }

  back(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
