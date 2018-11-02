import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TokenStorage } from '../../../../core/auth/token-storage.service';

@Component({
  selector: 'm-profile',
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  username:string;
  email:string;
  constructor(private tokenStorage: TokenStorage ) { }

  ngOnInit() {
    this.tokenStorage.getUserData().subscribe((info) => {
      this.username = info['fullname'];
      this.email = info['email'];
    })

  }
}
