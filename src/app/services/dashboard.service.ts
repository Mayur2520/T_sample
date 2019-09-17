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
}
