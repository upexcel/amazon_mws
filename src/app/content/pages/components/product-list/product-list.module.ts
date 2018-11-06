import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PartialsModule } from '../../../partials/partials.module';
import { MatTableModule } from '@angular/material/table';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatPaginatorModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from '@angular/material';
import { ProductListComponent } from './product-list.component'
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
		MatProgressSpinnerModule,
		RouterModule.forChild([
			{
				path: '',
				component: ProductListComponent
			}
		])
	],
	providers: [],
	declarations: [ProductListComponent]
})
export class ProductListModule { }
