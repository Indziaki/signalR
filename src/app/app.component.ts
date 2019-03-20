import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { ValuesService } from './values.service';
import { FormControl } from '@angular/forms';
import * as CanvasJS from '../assets/canvasjs.min'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web';
  private _hubConnection: HubConnection;
  msgs: any[] = [];
  dataPoints = [];
  mensaje = new FormControl("hola");
  chart: any;

  constructor(private _service: ValuesService){
  }
  
  ngOnInit(): void {
    this.generateChart();
    this._hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44389/hubs/Values", {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();

    this._hubConnection.on("Add", (value: string) => {
      this.msgs.push(value);
      this.dataPoints.push({ y: parseInt(value), label: "3" });
      this.chart.render();
    });
    this._hubConnection.on("Delete", (value: string) => {
      this.msgs = this.msgs.filter(v => v !== value);
    }); 
    this._hubConnection.start();
  }

  addMsg(){
    this._service.sendMessage(this.mensaje.value).subscribe(e=>console.log(e));
  }
  deleteMsg(index){
    this._service.deleteMessage(index).subscribe(e=>console.log(e));
  }

  generateChart(){
    this.chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Basic Column Chart in Angular"
      },
      data: [{
        type: "spline",
        dataPoints: this.dataPoints
      }]
    });
      
    this.chart.render();
  }
}
