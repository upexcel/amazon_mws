import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentComponent } from './shipment.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layout/layout.module';
import {MatTableModule} from '@angular/material/table';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatPaginatorModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
@NgModule({
	imports: [
		CommonModule,
		LayoutModule,
		MatTableModule,
		NgxJsonViewerModule,
		MatPaginatorModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		RouterModule.forChild([
			{
				path: '',
				component: ShipmentComponent
			}
		])
	],
	providers: [],
	declarations: [ShipmentComponent]
})
export class ShipmentModule { }
