import { Component, OnInit } from '@angular/core';

import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  mensaje: string = "";

  constructor(public chatService:ChatService) { 
    this.chatService.cargarMensajes().subscribe(
      (mensajes:any[]) => {
        console.log(mensajes);
      }
    );
  }

  ngOnInit(): void {
  }

  enviarMensaje() {
    console.log(this.mensaje);
  }

}
