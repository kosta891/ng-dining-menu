import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Area } from 'src/app/models/area.model';
import { Category } from 'src/app/models/category.model';
import { MenuService } from 'src/app/sevices/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  categories: Category[] = [];
  areas: Area[] = [];
  filteredCategories: Category[] = [];
  filteredAreas: Area[] = [];

  toogleMenu = false;
  term = '';

  form = new FormGroup({
    term: new FormControl(['']),
  });

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getAreas();

    this.form.get('term')?.valueChanges.subscribe((val) => {
      this.filteredCategories = this.categories.filter((v) =>
        v.strCategory.toLowerCase().includes(val)
      );
    });
    this.form.get('term')?.valueChanges.subscribe((val) => {
      this.filteredAreas = this.areas.filter((v) =>
        v.strArea.toLowerCase().includes(val)
      );
    });
  }

  getCategories() {
    this.menuService.getMealCategories().subscribe((categories): void => {
      this.categories = categories;
      this.filteredCategories = categories;
    });
  }

  getAreas() {
    this.menuService.getNationalMeals().subscribe((areas): void => {
      this.areas = areas;
      this.filteredAreas = areas;
    });
  }

  switchMenu() {
    this.toogleMenu = !this.toogleMenu;
  }
}
