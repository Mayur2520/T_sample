import { Component, OnInit } from '@angular/core';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';
import { AuthenticationService } from '../services/authentication.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private _AuthenticationService: AuthenticationService, private _storage:Storage, private device: Device, private router: Router) { }

  errormsg:string ='';

  ngOnInit() {
    this.authuserOnuuid(this.device.uuid);
  }

  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);
  PasswordFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  AuthenticateUser()
  {
     this._AuthenticationService.AuthenticateUser({username:this.usernameFormControl.value,password:this.PasswordFormControl.value,uuid:this.device.uuid}).subscribe(
      data => {
        this._storage.set('userdetails',JSON.stringify(data));
        this.router.navigate(['/login/attendance']);
      }) 

      // this.router.navigate(['/login/attendance']);
  }

  authuserOnuuid(uuid)
  {
    this._AuthenticationService.authuserOnuuid(uuid).subscribe(
      data => {
        if(data && data.success == true)
        {
        this._storage.set('userdetails',JSON.stringify(data));
        this.router.navigate(['/login/attendance']);
        }
        else
        {
          this.errormsg = data.message;
        }

      })
  }




}
