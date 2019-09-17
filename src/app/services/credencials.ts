import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
@Injectable()
export class AppGlobals {

    readonly ApiLink: string = 'http://103.252.7.5:8897';
}