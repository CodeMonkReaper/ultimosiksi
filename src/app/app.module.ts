import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// =====================================================
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    ZXingScannerModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     AngularFireModule.initializeApp(environment.firebaseConfig,
      )


    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
