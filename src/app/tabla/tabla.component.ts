import { Component, OnInit } from '@angular/core';
import { ValuesService } from '../values.service';
import { SignalRService } from '../signal-r.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  constructor(private _service: ValuesService, public signalRService: SignalRService){

  }
  dataSource: any[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['label', 'value'];

  ngOnInit() {
    this._service.getNumbers().subscribe((res:any[])=>{
      this.dataSource = res;
    });
    this.signalRService.startConnection();
    this.signalRService.hubConnection.on('Add', (data) => {
      this.dataSource = data.sort((a, b) => {
        if (a.value < b.value) return -1;
        else if (a.value > b.value) return 1;
        else return 0;
      });
    });
  }
}
