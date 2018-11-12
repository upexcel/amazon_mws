import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PartialsModule } from '../../../partials/partials.module';
import { ProductComponent } from './product.component'
import { MatTableModule } from '@angular/material/table';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		MatTableModule,
		NgxJsonViewerModule,
		MatPaginatorModule,
		MatFormFieldModule,
		MatSortModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		FormsModule,
		ReactiveFormsModule,
		MatProgressSpinnerModule,
		MatDialogModule,
		RouterModule.forChild([
			{
				path: '',
				component: ProductComponent
			}
		])
	],
	entryComponents: [
		AddSupplierComponent
	],
	declarations: [
		AddSupplierComponent,
		ProductComponent,
	],
	providers: []
})
export class ProductModule { }
