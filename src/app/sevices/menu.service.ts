import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { Categories, Meals } from '../models/category.model';
import { Areas } from '../models/area.model';
import { MealDetails } from '../models/meal-id';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  baseUrl = 'https://www.themealdb.com/api/json/v1/1/';

  categoryUrl = this.baseUrl + 'list.php?c=list';
  nationalMenuUrl = this.baseUrl + 'list.php?a=list';

  listOfMealsByCategoryUrl = this.baseUrl + 'filter.php?c=';
  listOfMealsByAreaUrl = this.baseUrl + 'filter.php?a=';

  searchMealDetailsByIdUrl = this.baseUrl + 'lookup.php?i=';

  searchAllMealsByLetterUrl = this.baseUrl + 'search.php?f=';

  constructor(private http: HttpClient) {}

  letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  getMealCategories() {
    return this.http
      .get<Categories>(this.categoryUrl)
      .pipe(map((categories: Categories) => categories.meals));
  }

  getNationalMeals() {
    return this.http
      .get<Areas>(this.nationalMenuUrl)
      .pipe(map((areas: Areas) => areas.meals));
  }

  getAllMealsByCategoryName(category: string) {
    return this.http
      .get<Meals>(this.listOfMealsByCategoryUrl + category)
      .pipe(map((meals: Meals) => meals.meals));
  }

  getAllMealsByAreaName(area: string) {
    return this.http
      .get<Meals>(this.listOfMealsByAreaUrl + area)
      .pipe(map((meals: Meals) => meals.meals));
  }

  getMealById(id: string) {
    return this.http
      .get<MealDetails>(this.searchMealDetailsByIdUrl + id)
      .pipe(map((meal: MealDetails) => meal.meals));
  }

  getAllMealsByLetter(letter: string) {
    return this.http
      .get<Meals>(this.searchAllMealsByLetterUrl + letter)
      .pipe(map((meals: Meals) => meals.meals));
  }

  deleteMeal(id: string) {
    return this.http.delete(this.searchMealDetailsByIdUrl + id);
  }

  updateMeal(id: string, body: MealDetails) {
    return this.http.put(this.searchMealDetailsByIdUrl + id, body);
  }
  addMeal(id: string, body: MealDetails) {
    return this.http.post(this.searchMealDetailsByIdUrl + id, body);
  }
}
