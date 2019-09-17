import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor( private _storage:Storage, private _AuthenticationService :AuthenticationService) { }
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
        console.log(this.userdetails )
        this.profilepic = this.serverip+'/uploads/'+this.userdetails.photo;
      }
    });
  }

}
