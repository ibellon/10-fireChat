import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public chats: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.chats = firestore.collection('chat').valueChanges();
  }
}
