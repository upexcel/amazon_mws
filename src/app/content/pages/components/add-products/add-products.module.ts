import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PartialsModule } from '../../../partials/partials.module';
import { MatTableModule } from '@angular/material/table';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatPaginatorModule, MatProgressSpinnerModule, MatDialogModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { AddProductsComponent } from './add-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		PartialsModule,
		MatTableModule,
		NgxJsonViewerModule,
		MatPaginatorModule,
		MatSelectModule,
		MatFormFieldModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		ReactiveFormsModule,
		MatProgressSpinnerModule,
		MatDialogModule,
		RouterModule.forChild([
			{
				path: '',
				component: AddProductsComponent
			}
		])
	],
	entryComponents: [
		AddSupplierComponent
	],
	declarations: [
		AddSupplierComponent,
		AddProductsComponent,
	],
	providers: []
})
export class AddProductsModule { }