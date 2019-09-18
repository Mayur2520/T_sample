import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterPipe } from 'ngx-filter-pipe';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss'],
})
export class ComplaintsComponent implements OnInit {

  ActiveSearch:boolean = false;
  searchfilter:any = {customername:null};
  constructor(private _DashboardService : DashboardService, private _storage:Storage, private router: Router, private filterPipe: FilterPipe) { }
  complaintsList:Array<any> = [];
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
        this.listComplaints(this.userdetails.Userlevel,this.userdetails.userId);
      }
    });
  }

  listComplaints(userlevel,userid)
  {
    this._DashboardService.complaintList(userlevel,userid).subscribe(
      data => {
        this.complaintsList = data;
        console.log(this.complaintsList)
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
