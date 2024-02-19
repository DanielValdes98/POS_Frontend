import { Component, Inject, OnInit } from '@angular/core';
import icClose from '@iconify/icons-ic/twotone-close';
import * as configs from '../../../../static-data/configs'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';
import { ca } from 'date-fns/locale';

@Component({
  selector: 'vex-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss']
})
export class CategoryManageComponent implements OnInit {

  icClose = icClose;
  configs = configs;

  form: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      categoryId: [0, [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
      state: ['', [Validators.required]],
    })
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _categoryService: CategoryService,
    public _dialogRef: MatDialogRef<CategoryManageComponent>
    ) {
    this.initForm();
   }

  ngOnInit(): void {
    if(this.data != null) {
      console.log(this.data);
      this.CategoryById(this.data.data.categoryId);
    }
  }

  CategoryById (CategoryId: number):void  {
    this._categoryService.CategoryById(CategoryId).subscribe(
      (resp) => {
        this.form.reset({
          categoryId: resp.categoryId,
          name: resp.name,
          description: resp.description,
          state: resp.state
        })
      }
    )

  }

  CategorySave(): void{
    if(this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched(); // Marcar todos los inputs invalidos como tocados. Cuando un en un campo no ingreso nada, marca ese campo con un error
      })
    }

    const categoryId = this.form.get('categoryId').value;

    if (categoryId > 0) {
      this.CategoryEdit(categoryId);
    } else {
      this.CategoryRegister();
    }
  }


  CategoryRegister(): void {
    // Captura el valor de todos los campos del formulario
    this._categoryService.CategoryRegister(this.form.value).subscribe((res) => {
      if (res.isSuccess) {
        this._alert.success('Excelente!', res.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn('Atención!', res.message);
      }
    })
  }

  CategoryEdit(categoryId: number): void {
    this._categoryService.CategoryEdit(categoryId, this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Excelente', resp.message);
        this._dialogRef.close(true);
      } else {
        this._alert.warn('Atención!', resp.message);
      }
    })
  }

}
