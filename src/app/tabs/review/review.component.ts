import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {

  birthdaysList:any =[];

  constructor(private _DashboardService : DashboardService, private _storage:Storage) { }

  ngOnInit() {
    this.listBirtdays()
  }

  listBirtdays()
  {
    this._DashboardService.listBirtdays().subscribe(
      data => {
        this.birthdaysList = data;
      });
  }

}
