import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboundShipmentsComponent } from './inboundShipments.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layout/layout.module';
import { MatIconModule } from "@angular/material/icon";
import {MatCardModule} from '@angular/material/card';
@NgModule({
	imports: [
		CommonModule,
		LayoutModule,
		MatIconModule,
		MatCardModule,
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
