import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfitAndLossComponent } from './profit-and-loss.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layout/layout.module';
import {MatTableModule} from '@angular/material/table';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatPaginatorModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { TableBodyComponent } from './table-body/table-body.component';
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
				component: ProfitAndLossComponent
			}
		])
	],
	providers: [],
	declarations: [ProfitAndLossComponent, TableBodyComponent]
})
export class ProfitAndLossModule { }
