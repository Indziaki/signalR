import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {

  private api: string = 'http://signalpoke.azurewebsites.net/api/values';

  constructor(private http: HttpClient) { }

  sendMessage(msg){
    return this.http.post(`${this.api}/${msg}`, null);
  }
  deleteMessage(id){
    return this.http.delete(`${this.api}/${id}`);
  }
  getNumbers(){
    return this.http.get(this.api);
  }
}
