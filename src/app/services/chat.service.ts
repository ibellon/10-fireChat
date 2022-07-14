import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chats:Mensaje[] = [];

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  constructor(private afs: AngularFirestore) { 
    this.itemsCollection = this.afs.collection<Mensaje>('chats');
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
