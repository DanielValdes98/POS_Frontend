import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { SharedModule } from '@shared/shared.module';
import { CategoryManageComponent } from './category-manage/category-manage.component';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryManageComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule // Para hacer uso de los componentes compartidos, iconos y Material 
  ]
})
export class CategoryModule { }
