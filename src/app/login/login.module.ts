import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModules } from '../ionic-plugins/material-module';
import { DeviceAccounts  } from '@ionic-native/device-accounts/ngx';
import { ThreeDeeTouch } from '@ionic-native/three-dee-touch/ngx'
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx'
import { Device } from '@ionic-native/device/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Autostart } from '@ionic-native/autostart/ngx';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { AttendanceComponent } from './attendance/attendance.component';
const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path:'attendance',
    component:AttendanceComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModules
  ],
  declarations: [LoginPage, AttendanceComponent],
  providers: [DeviceAccounts,
    ThreeDeeTouch,
    BackgroundGeolocation,
    Device,
    Geolocation,
    LocationAccuracy,
    Autostart,]
})
export class LoginPageModule {}
