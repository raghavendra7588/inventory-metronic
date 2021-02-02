import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../../../modules/auth/_models/user.model';
import { AuthService } from '../../../../../../modules/auth/_services/auth.service';

@Component({
  selector: 'app-user-offcanvas',
  templateUrl: './user-offcanvas.component.html',
  styleUrls: ['./user-offcanvas.component.scss'],
})
export class UserOffcanvasComponent implements OnInit {
  extrasUserOffcanvasDirection = 'offcanvas-right';
  user$: Observable<UserModel>;
  sellerName: string;
  vendorCode: string;
  role: string;
  city: string;

  constructor(private layout: LayoutService, private auth: AuthService) { }

  ngOnInit(): void {
    this.extrasUserOffcanvasDirection = `offcanvas-${this.layout.getProp(
      'extras.user.offcanvas.direction'
    )}`;
    this.user$ = this.auth.currentUserSubject.asObservable();
    
    this.sellerName = sessionStorage.getItem('sellerName');
    this.vendorCode = sessionStorage.getItem('vendorId');
    this.role = sessionStorage.getItem('role');
    this.city = sessionStorage.getItem('city');
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }
}
