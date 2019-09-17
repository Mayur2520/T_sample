import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthenticationService } from '../services/authentication.service';
import * as $ from 'jquery';
import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/interval';
import 'rxjs/add/operator/Map';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
})
export class NavigationPage implements OnInit {

  colorTheme:Observable<Array<any>>;
  colorThemeName:string;

  dataItems:Array<any> = [
    {primary:"rgb(48, 63, 159)",accent:"rgb(255, 64, 129)",blockbg:['#40ffbf','#ffbf40','#3f9f30']},
    {primary:"rgb(25, 118, 210)",accent:"rgb(255, 82, 82)",blockbg:['#d27519','#7519d2','#75d219']},
    {primary:"rgb(56, 142, 60)",accent:"rgb(255, 82, 82)",blockbg:['#388a8e','#5252ff','#52ffff']},
    {primary:"rgb(175, 180, 43)",accent:"rgb(124, 77, 255)",blockbg:['#2bb430','#b42baf','#ff7c4d']},
    {primary:"rgb(245, 124, 0)",accent:"rgb(68, 138, 255)",blockbg:['#7bf500','#ba44ff','#ff5d44']},
    {primary:"rgb(0, 121, 107)",accent:"rgb(255, 171, 64)",blockbg:['#000e79','#ac40ff','#4093ff']},
  ];

  reverseDataItems:Array<any> = [
    {accent:"rgb(48, 63, 159)",primary:"rgb(255, 64, 129)",blockbg:['#40ffbf','#ffbf40','#3f9f30']},
    {accent:"rgb(25, 118, 210)",primary:"rgb(255, 82, 82)",blockbg:['#d27519','#7519d2','#75d219']},
    {accent:"rgb(56, 142, 60)",primary:"rgb(255, 82, 82)",blockbg:['#388a8e','#5252ff','#52ffff']},
    {accent:"rgb(175, 180, 43)",primary:"rgb(124, 77, 255)",blockbg:['#2bb430','#b42baf','#ff7c4d']},
    {accent:"rgb(245, 124, 0)",primary:"rgb(68, 138, 255)",blockbg:['#7bf500','#ba44ff','#ff5d44']},
    {accent:"rgb(0, 121, 107)",primary:"rgb(255, 171, 64)",blockbg:['#000e79','#ac40ff','#4093ff']},
  ];

  userdetails:any = {fullname:''};
  userActive:number;


  constructor(private _AuthenticationService :AuthenticationService, private _storage:Storage, private router :Router,private geolocation: Geolocation) {}

  ngOnInit() {
    this.setupTheme();
    this.colorThemeName = 'this.dataItems';
    this.setColorThemeOrder();
    this._storage.get('userdetails').then((val) => {
      if(val == null)
      {
        // this.router.navigate(['/login']);
      }
      else
      {
        this.userdetails = JSON.parse(val);
        this.getAttendanceStatus(this.userdetails.userId);
      }
    });
  }

  getAttendanceStatus(userid)
  {
    
    this._AuthenticationService.getAttendanceStatus(userid).subscribe(
      data => {
        if(data[0].status ==1)
        {
          this.userActive =1;
        }
        else
        {
          this.userActive =0;
        }
      });
  }

  setupTheme()
  {
    localStorage.getItem('primaryBg')?$("body").css("--primary", localStorage.getItem('primaryBg')):$("body").css("--primary", "rgb(48, 63, 159)");
    localStorage.getItem('accentBg')?$("body").css("--accent",localStorage.getItem('accentBg')): $("body").css("--accent","rgb(255, 64, 129)");
    if(localStorage.getItem('thmeindex'))
    {
      var themeindex =  localStorage.getItem('thmeindex');
      $("body").css("--dscard1",this.dataItems[themeindex].blockbg[0]);
      $("body").css("--dscard2",this.dataItems[themeindex].blockbg[1]);
      $("body").css("--dscard3",this.dataItems[themeindex].blockbg[2]);
    }
    else
    {
      $("body").css("--dscard1",this.dataItems[0].blockbg[0]);
      $("body").css("--dscard2",this.dataItems[0].blockbg[1]);
      $("body").css("--dscard3",this.dataItems[0].blockbg[2]);
    }
  }

  setThemeOrder(themeset)
  {
    // return Observable.interval(2200).map(i=> eval(themeset))
    return eval(themeset);
  }

  setColorThemeOrder()
  {
      if(this.colorThemeName != 'this.reverseDataItems')
      {
        this.colorThemeName = 'this.reverseDataItems';
        this.colorTheme = this.setThemeOrder(this.colorThemeName);
      }
      else
      {
        this.colorThemeName = 'this.dataItems';
        this.colorTheme = this.setThemeOrder('this.dataItems');
      }
  }

  SelectedItem(details,index)
  {
    details.primary?localStorage.setItem('primaryBg', details.primary):'';
    details.accent?localStorage.setItem('accentBg', details.accent):'';
    details.accent?localStorage.setItem('thmeindex', index):'';
    this.setupTheme();
  }


  setAttendance()
  {

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude


      this._AuthenticationService.setAttendance({lat:resp.coords.latitude,lan:resp.coords.longitude,userid:this.userdetails.userId}).subscribe(
        data => {
          


          /* if(data.status == 0)
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
          } */
  
        })

      

     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
  }

}
