import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterPipe } from 'ngx-filter-pipe';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {

  ActiveSearch:boolean = false;
  searchfilter:any = {name:null};
  constructor(private _DashboardService : DashboardService, private _storage:Storage, private router: Router, private filterPipe: FilterPipe) { }
  customersList:Array<any> = [];
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
        this.ListCustomers(this.userdetails.Userlevel,this.userdetails.userId);
      }
    });
  }

  ListCustomers(userlevel,userid)
  {
    this._DashboardService.ListCustomers(userlevel,userid).subscribe(
      data => {
        this.customersList = data;
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
