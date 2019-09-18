import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthenticationService } from '../services/authentication.service';
import * as $ from 'jquery';
import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/interval';
import 'rxjs/add/operator/Map';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
})
export class NavigationPage implements OnInit {

  colorTheme:Observable<Array<any>>;
  colorThemeName:string;
  GradDataItem:Array<any> =
  [
    {p1:'#bc4e9c',p2:'#f80759',a1:'#00b09b',a2:'#96c93d',blockbg:[{c1:'#FFB75E',c2:'#ED8F03'},{c1:'#d53369',c2:'#cbad6d'},{c1:'#8E2DE2',c2:'#4A00E0'}],p_sample:"linear-gradient(to right,'#bc4e9c','#f80759')",a_sample:"linear-gradient(to right,'#00b09b','#96c93d')"},
    {p1:'#FF416C',p2:'#FF416C',a1:'#667db6',a2:'#0082c8',blockbg:[{c1:'#1D976C',c2:'#93F9B9'},{c1:'#ff0084',c2:'#33001b'},{c1:'#6a3093',c2:'#a044ff'}],p_sample:"linear-gradient(to right,'#FF416C','#FF416C')",a_sample:"linear-gradient(to right,'#667db6','#0082c8')"},
    {p1:'#ec008c',p2:'#fc6767',a1:'#56ab2f',a2:'#a8e063',blockbg:[{c1:'#2193b0',c2:'#6dd5ed'},{c1:'#ff00cc',c2:'#333399'},{c1:'#FFE000',c2:'#799F0C'}],p_sample:"linear-gradient(to right,'#ec008c','#fc6767')",a_sample:"linear-gradient(to right,'#56ab2f','#a8e063')"},
    {p1:'#FF8008',p2:'#FFC837',a1:'#00d2ff',a2:'#3a7bd5',blockbg:[{c1:'#FFB75E',c2:'#ED8F03'},{c1:'#d53369',c2:'#cbad6d'},{c1:'#8E2DE2',c2:'#4A00E0'}],p_sample:"linear-gradient(to right,'#FF8008','#FFC837')",a_sample:"linear-gradient(to right,'#00d2ff','#3a7bd5')"},
    {p1:'#00d2ff',p2:'#928DAB',a1:'#cc2b5e',a2:'#753a88',blockbg:[{c1:'#1D976C',c2:'#93F9B9'},{c1:'#ff0084',c2:'#33001b'},{c1:'#6a3093',c2:'#a044ff'}],p_sample:"linear-gradient(to right,'#00d2ff','#928DAB')",a_sample:"linear-gradient(to right,'#cc2b5e','#753a88')"},
    {p1:'#348F50',p2:'#56B4D3',a1:'#e53935',a2:'#e35d5b',blockbg:[{c1:'#2193b0',c2:'#6dd5ed'},{c1:'#ff00cc',c2:'#333399'},{c1:'#FFE000',c2:'#799F0C'}],p_sample:"linear-gradient(to right,'#348F50','#56B4D3')",a_sample:"linear-gradient(to right,'#e53935','#e35d5b')"},
  ]

  ReverseGradDataItem:Array<any> =
  [
    {a1:'#bc4e9c',a2:'#f80759',p1:'#00b09b',p2:'#96c93d',blockbg:[{c1:'#FFB75E',c2:'#ED8F03'},{c1:'#d53369',c2:'#cbad6d'},{c1:'#8E2DE2',c2:'#4A00E0'}]},
    {a1:'#FF416C',a2:'#FF4B2B',p1:'#667db6',p2:'#0082c8',blockbg:[{c1:'#1D976C',c2:'#93F9B9'},{c1:'#ff0084',c2:'#33001b'},{c1:'#6a3093',c2:'#a044ff'}]},
    {a1:'#ec008c',a2:'#fc6767',p1:'#56ab2f',p2:'#a8e063',blockbg:[{c1:'#2193b0',c2:'#6dd5ed'},{c1:'#ff00cc',c2:'#333399'},{c1:'#FFE000',c2:'#799F0C'}]},
    {a1:'#FF8008',a2:'#FFC837',p1:'#00d2ff',p2:'#3a7bd5',blockbg:[{c1:'#FFB75E',c2:'#ED8F03'},{c1:'#d53369',c2:'#cbad6d'},{c1:'#8E2DE2',c2:'#4A00E0'}]},
    {a1:'#00d2ff',a2:'#928DAB',p1:'#cc2b5e',p2:'#753a88',blockbg:[{c1:'#1D976C',c2:'#93F9B9'},{c1:'#ff0084',c2:'#33001b'},{c1:'#6a3093',c2:'#a044ff'}]},
    {a1:'#348F50',a2:'#56B4D3',p1:'#e53935',p2:'#e35d5b',blockbg:[{c1:'#2193b0',c2:'#6dd5ed'},{c1:'#ff00cc',c2:'#333399'},{c1:'#FFE000',c2:'#799F0C'}]},
  ]
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


    Swal.fire({
      title: 'Are you sure?',
      text: 'Contact to admin if reset your out time.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.geolocation.getCurrentPosition().then((resp) => {
          // resp.coords.latitude
          // resp.coords.longitude
    
    
          this._AuthenticationService.setAttendance({lat:resp.coords.latitude,lan:resp.coords.longitude,userid:this.userdetails.userId}).subscribe(
            data => {
              
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
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Out time Not registered',
          'error'
        )
      }
    })

   
     
  }

}
