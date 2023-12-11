import { Component, Inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdatedAssistComponent } from 'src/app/shared/components/add-updated-assist/add-updated-assist.component';
import { AlertController } from '@ionic/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  camerasFoundHandler(cameras: MediaDeviceInfo[]): void {
    // Maneja la información de las cámaras encontradas (si es necesario)
    console.log('Cámaras encontradas:', cameras);
  }

  firebaseSvc = Inject(FirebaseService)
  utilsSvc = Inject(UtilsService)
  isSupported = false;
  barcodes: string[] = [];
  constructor(private alertController:AlertController) {

  }




  ngOnInit() {
    // Verifica si el escáner es compatible al inicio
    this.isSupported = 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;
  }

  onCodeScanned(result: string): void {
    // Maneja el valor del código QR escaneado (result)
    console.log('Código QR escaneado:', result);
    this.barcodes.push(result);
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  startScan(): void {
    // Limpia los códigos anteriores
    this.barcodes = [];

    // Comprueba si el escáner es compatible
    if (this.isSupported) {
      // Muestra la lógica para iniciar el escaneo directamente en la plantilla
    } else {
      // Muestra una alerta si el escáner no es compatible
      this.presentAlert();
    }
  }
  signOut() {
    this.firebaseSvc.signOut();
  }

  addUpdateAssist() {
    this.utilsSvc.presentModal({
      Component: AddUpdatedAssistComponent,
    });
  }
}
