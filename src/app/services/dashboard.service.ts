import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppGlobals } from './credencials';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _http: HttpClient,private _global: AppGlobals) { }

  apiUrl = this._global.ApiLink;

  getDashboardCounts(userlevel,userid): Observable<any>
  {
    return this._http.get(this.apiUrl+'/api/getDashboardCount/Today/'+userlevel+'/'+userid).pipe(map(data => {
      return data;
    }));
  }

  ListUserReviews(userlevel,userid): Observable<any>
  {
    return this._http.get(this.apiUrl+'/api/ListUsersReviews/'+userlevel+'/'+userid).pipe(map(data => {
      return data;
    }));
  }

  ListCustomers(userlevel,userid): Observable<any>
  {
    return this._http.get(this.apiUrl+'/api/ListCustomers/').pipe(map(data => {
      return data;
    }));
  }

  ListEnquiries(userlevel,userid): Observable<any>
  {
    return this._http.get(this.apiUrl+'/api/EnquiryList/'+userid+'/'+userlevel).pipe(map(data => {
      return data;
    }));
  }

  complaintList(userlevel,userid): Observable<any>
  {
    return this._http.get(this.apiUrl+'/api/complaintList/'+userid+'/'+userlevel).pipe(map(data => {
      return data;
    }));
  }

  listBirtdays(): Observable<any>
  {
    return this._http.get(this.apiUrl+'/api/userList/').pipe(map(data => {
      return data;
    }));
  }

  getSalaryDetails(userid,curdate): Observable<any>
  {
    return this._http.get(this.apiUrl+'/api/getemployeesalaryOnemployee/'+userid+'/'+curdate).pipe(map(data => {
      return data;
    }));
  }
}
