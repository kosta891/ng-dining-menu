export interface Category {
  strCategory: string;
}
export interface Categories {
  meals: Category[];
}

export interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface Meals {
  meals: Meal[];
}
