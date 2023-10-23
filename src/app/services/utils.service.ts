import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera,CameraResultType,CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl=inject(LoadingController)
  toastCtrl = inject(ToastController)
  modalCtrl = inject(ModalController)
  router = inject(Router)

  async takePicture(){
    return await Camera.getPhoto({
      quality:100,
      allowEditing:false,
      resultType:CameraResultType.DataUrl,
      source: CameraSource.Camera,
      promptLabelHeader:'Tomar foto',
      promptLabelCancel:'Cancelar',
      promptLabelPicture:'Tomar foto',
    })
  }


  loading(){
    return this.loadingCtrl.create({spinner:'lines-sharp',message:'Cargando...'})
  }
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

// =================enruta a cualquier pagina disponible en la aplicacion==================
routerLink(url:string){
  return this.router.navigateByUrl(url)
}
// ====================guardar y obtener datos del local storage=========================
saveInLocalStorage(key:string,value:any){
  return localStorage.setItem(key,JSON.stringify(value))
}
// ====================guardar y obtener datos del local storage=========================
getFromLocalStorage(key:string){
  return JSON.parse(localStorage.getItem(key))
}
// modal
async presentModal(opt:ModalOptions){
  const modal = await this.modalCtrl.create(opt)
  await modal.present()
  const {data} = await modal.onWillDismiss()
  if(data){
    return data
  }

}

dismissModal(data?:any){
  return this.modalCtrl.dismiss(data)

}

}
