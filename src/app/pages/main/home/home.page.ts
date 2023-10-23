import { Component, Inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdatedAssistComponent } from 'src/app/shared/components/add-updated-assist/add-updated-assist.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = Inject(FirebaseService)
  utilsSvc = Inject(UtilsService)


  ngOnInit() {
  }

  async takePicture(){
    const dataurl = await this.utilsSvc.takePicture()
    console.log(dataurl)
    
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
