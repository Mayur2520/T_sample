import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModules } from '../ionic-plugins/material-module';
import { IonicModule } from '@ionic/angular';
import { ThemeColorDirective } from '../directives/theme-color.directive';
import { TabsPage } from './tabs.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavigationPage } from '../navigation/navigation.page';
import { HomeComponent } from './home/home.component';
import { SalaryComponent } from './salary/salary.component';
import { ReviewComponent } from './review/review.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:
    [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'salary',
       component: SalaryComponent
      },
      {
        path: 'review',
       component: ReviewComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
},
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModules,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers:[Geolocation],
  declarations: [TabsPage,NavigationPage,HomeComponent,
    SalaryComponent,
    ReviewComponent,
    ProfileComponent,ThemeColorDirective]
})
export class TabsPageModule {}
