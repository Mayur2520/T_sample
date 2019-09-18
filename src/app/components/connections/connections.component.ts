import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterPipe } from 'ngx-filter-pipe';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss'],
})
export class ConnectionsComponent implements OnInit {

  ActiveSearch:boolean = false;
  searchfilter:any = {customername:null,conectionstats:1};
  constructor(private _DashboardService : DashboardService, private _storage:Storage, private router: Router, private filterPipe: FilterPipe) { }
  ConnectionsList:Array<any> = [];
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
        this.ListConnections(this.userdetails.Userlevel,this.userdetails.userId);
      }
    });
  }

  ListConnections(userlevel,userid)
  {
    this._DashboardService.ListEnquiries(userlevel,userid).subscribe(
      data => {
        this.ConnectionsList = data;
        console.log(this.ConnectionsList)
      });
  }
  

  
  ShowHideSearch()
  {
    if(this.ActiveSearch == false)
    {
      this.ActiveSearch = true;
    }
    else
    {
      this.ActiveSearch = false;
    }
  }
}
