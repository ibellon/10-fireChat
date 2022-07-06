import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  mensaje: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  enviarMensaje() {
    console.log(this.mensaje);
  }

}
