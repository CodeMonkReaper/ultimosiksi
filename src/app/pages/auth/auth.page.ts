import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
 
  })

  fireBaseSvc = inject(FirebaseService);
  utilsSVC=inject(UtilsService);
  ngOnInit() {
  }

   async submit(){
    if(this.form.valid){
      const loading = await this.utilsSVC.loading();
      await loading.present();
    this.fireBaseSvc.sigIn(this.form.value as User).then(res=>{
      this.getUserInfo(res.user.uid);
      
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


  async getUserInfo(uid:string){
    if(this.form.valid){
      const loading = await this.utilsSVC.loading();
      await loading.present();
      let path = `users/${uid}`;
    this.fireBaseSvc.getDocument(path).then((user : User) =>{

     this.utilsSVC.saveInLocalStorage('user',user);
     this.utilsSVC.routerLink('/main/home')
     this.form.reset();

     this.utilsSVC.presentToast(
      {
        message: `Bienvenido ${user.name}`,
        duration: 1500,
        color:'danger',
        position:'middle',
        icon:'alert-circle-outline'
      })

     
      
    }).catch(error=>{
      console.log(error);




      this.utilsSVC.presentToast(
        {
          message: error.message,
          duration: 2000,
          color:'danger',
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
