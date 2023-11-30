import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewprofePageRoutingModule } from './viewprofe-routing.module';

import { ViewprofePage } from './viewprofe.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewprofePageRoutingModule,
    SharedModule
  ],
  declarations: [ViewprofePage]
})
export class ViewprofePageModule {}
