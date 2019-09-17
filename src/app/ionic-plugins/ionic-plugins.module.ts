import { NgModule } from '@angular/core';
import { DeviceAccounts  } from '@ionic-native/device-accounts/ngx';
import { ThreeDeeTouch } from '@ionic-native/three-dee-touch/ngx'
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx'
import { Device } from '@ionic-native/device/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Autostart } from '@ionic-native/autostart/ngx';


@NgModule({
  exports: [
    DeviceAccounts,
    ThreeDeeTouch,
    BackgroundGeolocation,
    Device,
    Geolocation,
    LocationAccuracy,
    Autostart,
  ]
})
export class IonicPluginsModule { }
