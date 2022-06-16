import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMealComponent } from './edit-meal/edit-meal.component';
import { MealsDetailComponent } from './meals-list/meals-detail/meals-detail.component';
import { MealsListComponent } from './meals-list/meals-list.component';

const routes: Routes = [
  {
    path: '',
    component: MealsListComponent,

    children: [
      { path: 'new', component: EditMealComponent },
      { path: ':id', component: MealsDetailComponent },
      { path: ':id/edit', component: EditMealComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
