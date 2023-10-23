import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user.model';
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { UtilsService } from './utils.service';
import{ AngularFirestore } from '@angular/fire/compat/firestore'
import{ getFirestore,setDoc,doc, getDoc } from '@angular/fire/firestore'
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth= inject(AngularFireAuth);
  utilsSvc = inject(UtilsService);
  firestore= inject(AngularFirestore);

  // ==============================autenticacion===============================

  getAuth(){
    return getAuth();
  }


  // ================acceder=========================
  sigIn(user: User){
    return signInWithEmailAndPassword(getAuth(),user.email,user.password)
  }
  // ==================registrar==========================
  sigUp(user: User){
    return createUserWithEmailAndPassword(getAuth(),user.email,user.password)
  }
  updateUser(displayName:string){
    return updateProfile(getAuth().currentUser,{displayName})
  }

  // ===================recuperar contraseña=====================

  sendRecoveryEmail(email:string){
    return sendPasswordResetEmail(getAuth(),email)
  }

  // ===================cerrar sesion=====================
  signOut(){
    getAuth().signOut();
    localStorage.removeItem('user')
    this.utilsSvc.routerLink('/auth');
  }

  // ========================base de datos==============================
  setDocument(path:string, data:any){
    return setDoc(doc(getFirestore(),path),data)
  }
  
  async getDocument(path:string){
    return (await getDoc(doc(getFirestore(),path))).data();
  }
  
   
}
