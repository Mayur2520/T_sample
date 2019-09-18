import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../../services/authentication.service';
import { DashboardService } from '../../services/dashboard.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor( private _storage:Storage, private _AuthenticationService :AuthenticationService,private _DashboardService : DashboardService) { }
  userdetails :any = {username:''};
  profilepic :string = '';
  serverip:String = this._AuthenticationService.apiUrl;

  ngOnInit() {
    this._storage.get('userdetails').then((val) => {
      if(val == null)
      {
        // this.router.navigate(['/login']);
      }
      else
      {
        this.userdetails = JSON.parse(val);
        this.profilepic = this.serverip+'/uploads/'+this.userdetails.photo;
        this.ListUserReviews(this.userdetails.Userlevel, this.userdetails.userId)
      }
    });
  }

  ListUserReviews(userlevel,userid)
  {
    this._DashboardService.ListUserReviews(userlevel,userid).subscribe(
      data => {
       console.log(data)
      });
  }

}
