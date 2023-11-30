import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from './components/logo/logo.component';
import { AddUpdatedAssistComponent } from './components/add-updated-assist/add-updated-assist.component';



@NgModule({
  declarations: [HeaderComponent,CustomInputComponent,LogoComponent,AddUpdatedAssistComponent],

  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  exports: [HeaderComponent,
    CustomInputComponent,
    FormsModule,
    ReactiveFormsModule,
    AddUpdatedAssistComponent,
    LogoComponent,
  ],
})
export class SharedModule { }
