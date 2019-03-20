import { Component, OnInit } from '@angular/core';
import { ValuesService } from '../values.service';
import { SignalRService } from '../signal-r.service';
import * as CanvasJS from '../../assets/canvasjs.min'; 

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  dataPoints = [];
  chart: any;

  constructor(private _service: ValuesService, public signalRService: SignalRService) { }

  ngOnInit() {
    this.generateChart();
    this.signalRService.startConnection();
    this.signalRService.hubConnection.on('Add', (data) => {
      this.dataPoints = [];
      data.forEach(i=>this.dataPoints.push({ y: parseInt(i.value), label: i.label }));
      this.chart.options.data[0].dataPoints = this.dataPoints;
      this.chart.render();
    });
  }

  generateChart(){
    this._service.getNumbers().subscribe((res: any[])=>{
      res.forEach(i=>this.dataPoints.push({ y: parseInt(i.value), label: i.label }));
      this.chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Datos de ventas"
        },
        data: [{
          type: "doughnut",
          dataPoints: this.dataPoints
        }]
      });
        
      this.chart.render();
    });
  }

}
