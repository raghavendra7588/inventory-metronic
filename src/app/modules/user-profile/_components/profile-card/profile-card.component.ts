import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { EmitterService } from 'src/app/shared/emitter.service';
import { AuthService, UserModel } from '../../../auth';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit, OnDestroy {

  user$: Observable<UserModel>;
  sellerName: string;
  vendorCode: string;
  role: string;
  city: string;
  isLoggedInSubscription: Subscription;
  constructor(
    public userService: AuthService,
    private router: Router,
    public emitterService: EmitterService,
    private cdr: ChangeDetectorRef) {
    this.user$ = this.userService.currentUserSubject.asObservable();
    this.router.navigate(['/user-profile/addAddress']);
  }

  ngOnInit(): void {
    this.sellerName = sessionStorage.getItem('sellerName');
    this.vendorCode = sessionStorage.getItem('vendorId');
    this.role = sessionStorage.getItem('role');
    this.city = sessionStorage.getItem('city');

    this.isLoggedInSubscription = this.emitterService.isLoggedIn.subscribe(val => {
      if (val) {
        this.city = '';
        this.city = sessionStorage.getItem('city');
        this.cdr.detectChanges();
      }
    });

  }
  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }

}
