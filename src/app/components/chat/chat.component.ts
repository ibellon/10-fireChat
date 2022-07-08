import { Component, OnInit } from '@angular/core';

import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  mensaje: string = "";

  constructor(public chatService:ChatService) { 
    this.chatService.cargarMensajes().subscribe();
  }

  ngOnInit(): void {
  }

  enviarMensaje() {
    console.log(this.mensaje);

    if(this.mensaje.length === 0) {
      return;
    }

    this.chatService.agregarMensaje(this.mensaje)
      .then(() => this.mensaje = "")
      .catch(error => console.log("Error al guardar", error));
  }

}
