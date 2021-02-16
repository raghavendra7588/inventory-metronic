import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, UserModel } from '../../../auth';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  user$: Observable<UserModel>;
  sellerName: string;
  vendorCode: string;
  role: string;
  city: string;

  constructor(
    public userService: AuthService,
    private router: Router) {
    this.user$ = this.userService.currentUserSubject.asObservable();
      this.router.navigate(['/user-profile/addAddress']);
  }

  ngOnInit(): void { 
    this.sellerName = sessionStorage.getItem('sellerName');
    this.vendorCode = sessionStorage.getItem('vendorId');
    this.role = sessionStorage.getItem('role');
    this.city = sessionStorage.getItem('city');
  }

}
