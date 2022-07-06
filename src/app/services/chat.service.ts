import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chats:any[] = [];

  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) { 
    this.itemsCollection = this.afs.collection<any>('chats');
  }

  cargarMensajes() {  
    return this.itemsCollection.valueChanges();
  }
}
