import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';

import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chats:Mensaje[] = [];

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public usuario: any = {};

  constructor(private afs: AngularFirestore, public auth: AngularFireAuth) { 
    this.itemsCollection = this.afs.collection<Mensaje>('chats');
    auth.authState.subscribe(user => {
        console.log("Estado el usuario: ", user);
        if(!user) {
          return;
        }
        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
    });
  }

  login(proveedor: string) {
    if(proveedor === 'Google'){
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    //Resto de Proveedores...
  }
  logout() {
    this.usuario = {};
    this.auth.signOut();
  }

  cargarMensajes() { 
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref =>
      ref.orderBy('fecha', 'desc').limit(5)); 

    return this.itemsCollection.valueChanges()
    .pipe(map( (mensajes: Mensaje[]) => {
      console.log(mensajes);
      this.chats = [];
      for(let mensaje of mensajes) {
        this.chats.unshift(mensaje);
      }
      return this.chats;                       
    }));                       
  }

  agregarMensaje(texto: string) {

    //TODO Falta el uid del usuario
    let mensaje: Mensaje = {
      nombre: 'Isidro',
      mensaje: texto,
      fecha: new Date().getTime()
    }

    return this.itemsCollection.add(mensaje);
  }
}
