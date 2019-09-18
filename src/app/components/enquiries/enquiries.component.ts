import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterPipe } from 'ngx-filter-pipe';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.scss'],
})
export class EnquiriesComponent implements OnInit {
  ActiveSearch:boolean = false;
  searchfilter:any = {customername:null,conectionstats:0};
  constructor(private _DashboardService : DashboardService, private _storage:Storage, private router: Router, private filterPipe: FilterPipe) { }
  enquiryList:Array<any> = [];
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
        this.ListEnquiries(this.userdetails.Userlevel,this.userdetails.userId);
      }
    });
  }

  ListEnquiries(userlevel,userid)
  {
    this._DashboardService.ListEnquiries(userlevel,userid).subscribe(
      data => {
        this.enquiryList = data;
        console.log(this.enquiryList)
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
