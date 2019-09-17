import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {


  constructor(private _AuthenticationService :AuthenticationService, private _storage:Storage, private router: Router,private geolocation: Geolocation) { }

  userdetails:any = {fullname:''};
  serverip:String = this._AuthenticationService.apiUrl;
  profilepic:string;


  ngOnInit() {
    setTimeout( ()=>{
      this.getUserDetails();
    }, 5000);
  }
  getUserDetails()
  {
    this._storage.get('userdetails').then((val) => {
      if(val == null)
      {
        this.router.navigate(['/login']);
      }
      else
      {
        this.userdetails = JSON.parse(val);
        if(this.userdetails)
        {
          this.profilepic = this.serverip+'/uploads/'+this.userdetails.photo;
          this.getAttendanceStatus(this.userdetails.userId);
        }
      }
    });
    
  }


  getAttendanceStatus(userid)
  {
    this._AuthenticationService.getAttendanceStatus(userid).subscribe(
      data => {
        if(data.length == 1)
        {
          this.router.navigate(['/tabs']);
        }
      });
  }
  
  setAttendance()
  {

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude


      this._AuthenticationService.setAttendance({lat:resp.coords.latitude,lan:resp.coords.longitude,userid:this.userdetails.userId}).subscribe(
        data => {
          
          console.log(data);

          if(data.status == 0)
          {
          this.router.navigate(['/tabs']);
          }  
          else if(data.status == 4)
          {
            this.router.navigate(['/login']);
          }
          else
          {
            alert(data.message);
            this.router.navigate(['/tabs']);
          }
  
        })

      

     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
  }

}
