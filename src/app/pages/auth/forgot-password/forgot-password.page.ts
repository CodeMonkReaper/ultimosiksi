import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
 
  })

  fireBaseSvc = inject(FirebaseService);
  utilsSVC=inject(UtilsService);
  ngOnInit() {
  }

   async submit(){
    if(this.form.valid){
      const loading = await this.utilsSVC.loading();
      await loading.present();
    this.fireBaseSvc.sendRecoveryEmail(this.form.value.email).then(res=>{
      

      this.utilsSVC.presentToast({
        message: 'Se ha enviado un correo para restablecer la contraseña',
        duration: 2000,
        color:'medium',
        position:'middle',
        icon:'checkmark-done-circle-outline'
      })
      this.utilsSVC.routerLink('/auth');
      this.form.reset();
      
    }).catch(error=>{
      console.log(error);
      this.utilsSVC.presentToast(
        {
          message: error.message,
          duration: 2000,
          color:'medium',
          position:'middle',
          icon:'alert-circle-outline'

        }
      )
    }).finally(()=>{
      loading.dismiss();
    })


  }
  }


  

}
