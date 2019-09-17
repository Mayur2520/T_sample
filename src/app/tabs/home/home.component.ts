import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  dashboarCounts:any = [{advancebal: null,
    compl:null,
    customers: null,
    loadnbal: null,
    newconn:null,
    newenq:null,
    planscount: null,
    totalcollection: null,
    username: null}];
  constructor(private _DashboardService : DashboardService, private _storage:Storage) { }
  userdetails:any = {fullname:''};
  ngOnInit() {
    this._storage.get('userdetails').then((val) => {
      if(val == null)
      {
        // this.router.navigate(['/login']);
      }
      else
      {
        this.userdetails = JSON.parse(val);
        console.log(this.userdetails)
        this.getDashboardCounts(this.userdetails.Userlevel,this.userdetails.userId);
      }
    });
  }

  getDashboardCounts(userLevel,userid)
  {
    this._DashboardService.getDashboardCounts(userLevel,userid).subscribe(
      data => {
        this.dashboarCounts = data;
        console.log(data)
      });
  }

}
