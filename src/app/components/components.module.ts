import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MaterialModules } from '../ionic-plugins/material-module';
import { ComponentsPage } from './components.page';
import { ComplaintsComponent } from './complaints/complaints.component';
import { ConnectionsComponent } from './connections/connections.component';
import { CustomersComponent } from './customers/customers.component';
import { EnquiriesComponent } from './enquiries/enquiries.component';
const routes: Routes = [
  {
    path: 'complaints',
    component: ComplaintsComponent
  },
  {
    path: 'connections',
    component: ConnectionsComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'enquiries',
    component: EnquiriesComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModules,
    RouterModule.forChild(routes)
  ],
  declarations: [ComponentsPage, ComplaintsComponent, ConnectionsComponent, CustomersComponent, EnquiriesComponent]
})
export class ComponentsPageModule {}
