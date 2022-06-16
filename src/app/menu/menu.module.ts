import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MenuRoutingModule } from './menu-routing.module';
import { MealsListComponent } from './meals-list/meals-list.component';
import { MealsDetailComponent } from './meals-list/meals-detail/meals-detail.component';
import { EditMealComponent } from './edit-meal/edit-meal.component';

@NgModule({
  declarations: [MealsListComponent, MealsDetailComponent, EditMealComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MenuRoutingModule,
  ],
})
export class MenuModule {}
