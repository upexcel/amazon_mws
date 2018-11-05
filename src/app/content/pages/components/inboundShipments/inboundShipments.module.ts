import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboundShipmentsComponent } from './inboundShipments.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layout/layout.module';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';
import {
	MatTableModule,
	MatSortModule,
	MatPaginatorModule,
	MatFormFieldModule,
	MatInputModule
} from '@angular/material';
@NgModule({
	imports: [
		CommonModule,
		LayoutModule,
		MatIconModule,
		MatCardModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		MatFormFieldModule,
		MatInputModule,
		RouterModule.forChild([
			{
				path: '',
				component: InboundShipmentsComponent
			}
		])
	],
	providers: [],
	declarations: [InboundShipmentsComponent]
})
export class InboundShipmentsModule { }
