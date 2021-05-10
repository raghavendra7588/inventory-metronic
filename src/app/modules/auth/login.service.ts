import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './_services/auth-http/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    public http: HttpClient
  ) { }

  public LOGIN_URL = 'http://3intellects.co.in/AdminApi/api//user/authenticate';
  private LOGGED_IN_URL = 'https://3intellects.co.in/uat_AdminApi/api/User/authenticate';

  public seller_token: string;
  public seller_mapped_categories: any = [];
  public seller_object: any = [];
  public seller_id: number;
  public seller_name: any;


  loginUser(user: User) {
    return this.http.post<any>(this.LOGGED_IN_URL, user);
  }

}
