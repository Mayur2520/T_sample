import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppGlobals } from './credencials';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  
  

  constructor(private _http: HttpClient,private _global: AppGlobals) { }

  apiUrl = this._global.ApiLink;

  AuthenticateUser(userdetails): Observable<any>
  {
    return this._http.post(this.apiUrl+'/api/user/auth/',userdetails).pipe(map(data => {
      return data;
    }));
  }

  RegisterPushToken(pushToken): Observable<any>
  {
    return this._http.post(this.apiUrl+'/api/SetTokenForPush/',pushToken).pipe(map(data => {
      return data;
    }));
  }

  setAttendance(userAttendancedetails): Observable<any>
  {
    return this._http.post(this.apiUrl+'/api/userAttendance/',userAttendancedetails).pipe(map(data => {
      return data;
    }));
  }

  SendCurrentLocation(userLocationDetails): Observable<any>
  {
    return this._http.post(this.apiUrl+'/api/SendCurrentLocation/',userLocationDetails).pipe(map(data => {
      return data;
    }));
  }
  
  getAttendanceStatus(userid): Observable<any>
  {
    return this._http.get(this.apiUrl+'/api/getattendancestatus/'+userid).pipe(map(data => {
      return data;
    }));
  }
  
  authuserOnuuid(uuid): Observable<any>
  {
    return this._http.get(this.apiUrl+'/api/user/authuserOnuuid/'+uuid).pipe(map(data => {
      return data;
    }));
  }
  
  updateuserLocation(userAttendancedetails): Observable<any>
  {
    return this._http.post(this.apiUrl+'/api/UpdateCurrentLocation/',userAttendancedetails).pipe(map(data => {
      return data;
    }));
  }

 

}
