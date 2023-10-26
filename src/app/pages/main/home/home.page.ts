import { Component, Inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdatedAssistComponent } from 'src/app/shared/components/add-updated-assist/add-updated-assist.component';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = Inject(FirebaseService)
  utilsSvc = Inject(UtilsService)
  isSupported = false;
  barcodes: Barcode[] = [];
  constructor(private alertController:AlertController) {
    
  }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }
  startScan(): void {
    this.barcodes = [];
    this.scan();
  }
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return Promise.resolve();
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  signOut(){
    this.firebaseSvc.signOut()
  }

  addUpdateAssist(){
    this.utilsSvc.presentModal({
    Component: AddUpdatedAssistComponent
    })
  }

}
