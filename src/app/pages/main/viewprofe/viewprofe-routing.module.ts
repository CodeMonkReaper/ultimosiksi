import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewprofePage } from './viewprofe.page';

const routes: Routes = [
  {
    path: '',
    component: ViewprofePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewprofePageRoutingModule {}
