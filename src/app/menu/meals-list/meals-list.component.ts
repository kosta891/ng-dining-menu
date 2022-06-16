import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Meal } from 'src/app/models/category.model';
import { MenuService } from 'src/app/sevices/menu.service';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
})
export class MealsListComponent implements OnInit {
  name = '';
  mealsCategory: Meal[] = [];
  mealsArea: Meal[] = [];
  filteredCategories: Meal[] = [];
  filteredAreas: Meal[] = [];

  term = '';

  isAllMeals = false;
  allMeals: Meal[] = [];
  filteredAllMeals: Meal[] = [];
  letters = this.menuService.letters;

  form = new FormGroup({
    term: new FormControl(['']),
  });

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['name'] === 'all-meals') {
        this.isAllMeals = true;
      } else {
        this.isAllMeals = false;
        this.getMealListByCategory();
        this.getMealListByArea();
      }
    });

    this.form.get('term')?.valueChanges.subscribe((val) => {
      this.filteredCategories = this.mealsCategory.filter((v) =>
        v.strMeal.toLowerCase().includes(val)
      );
    });

    this.form.get('term')?.valueChanges.subscribe((val) => {
      this.filteredAreas = this.mealsArea.filter((v) =>
        v.strMeal.toLowerCase().includes(val)
      );
    });

    this.form.get('term')?.valueChanges.subscribe((val) => {
      this.filteredAllMeals = this.allMeals.filter((v) =>
        v.strMeal.toLowerCase().includes(val)
      );
    });
  }

  getMealListByCategory() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.name = params['name'];

          return this.menuService.getAllMealsByCategoryName(this.name);
        })
      )
      .subscribe((meals: Meal[]) => {
        this.mealsCategory = meals;
        this.filteredCategories = meals;
      });
  }

  getMealListByArea() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.name = params['name'];

          return this.menuService.getAllMealsByAreaName(this.name);
        })
      )
      .subscribe((meals: Meal[]) => {
        this.mealsArea = meals;
        this.filteredAreas = meals;
      });
  }

  getAllMealsByLetter(letter: string) {
    this.menuService.getAllMealsByLetter(letter).subscribe((meals: Meal[]) => {
      this.allMeals = meals;
      this.filteredAllMeals = meals;
    });
  }

  changeLetter(letter: string) {
    this.getAllMealsByLetter(letter);
  }

  newMeal() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
