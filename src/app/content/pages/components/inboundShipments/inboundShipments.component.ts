import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'm-inboundShipments',
  templateUrl: './inboundShipments.component.html',
  styleUrls: ['./inboundShipments.component.scss']
})
export class InboundShipmentsComponent implements OnInit {
  shipmentData: any;
  constructor(private _change: ChangeDetectorRef,
    private _authService: AuthenticationService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe(routeParams => {
      this._authService.getTypeAjax(`/seller/InboundShipmentsById/A2WR6NEBQYUU6E/${routeParams.id}`).subscribe((res) => {
        this.shipmentData=res['ItemData'];
        this._change.detectChanges();
      })
    });
  }
}
