import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss'],
})
export class SalaryComponent implements OnInit {
  
  salaryDetails:any = [{Latemarks: null,
    advance: null,
    department: null,
    designation: null,
    fullname: null,
    halfdays: null,
    id:null,
    joiningdate:null,
    loaninst: null,
    mobile_exp:null,
    month: null,
    other_exp:null,
    payamt: null,
    perdaysal:null,
    presentdays:null,
    salary: null,
    thursdays:null,
    totalsal:null,
    travel_exp:null,
    username: null,
    workingdays: null}];

  curdate = new Date();
  TotalDaysInMonth:number =0;
  constructor(private _DashboardService : DashboardService, private _storage:Storage) {

    

   }
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
        this.getSalaryDetails(this.userdetails.userId,this.curdate);
      }
    });
  }

  getSalaryDetails(userid,event)
  {
    if(event)
    {
      if(event.detail)
      {
        this.curdate = new Date(event.detail.value);
      }
    }
    
    this.TotalDaysInMonth = new Date(this.curdate.getFullYear(), ((this.curdate.getMonth()) +1), 0).getDate();
    this._DashboardService.getSalaryDetails(userid,this.curdate).subscribe(
      data => {
        this.salaryDetails = data;
      });
  }
}
