import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PartialsModule } from '../../../partials/partials.module';
import { MatTableModule } from '@angular/material/table';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatPaginatorModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { AddProductsComponent } from './add-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		MatTableModule,
		NgxJsonViewerModule,
		MatPaginatorModule,
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
				component: AddProductsComponent
			}
		])
	],
	providers: [],
	entryComponents: [
	
	],
	declarations: [ AddProductsComponent]
})
export class AddProductsModule { }