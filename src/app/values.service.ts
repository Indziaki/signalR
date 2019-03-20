import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {

  private api: string = 'https://localhost:44389/api/values';

  constructor(private http: HttpClient) { }

  sendMessage(msg){
    return this.http.post(`${this.api}/${msg}`, null);
  }
  deleteMessage(id){
    return this.http.delete(`${this.api}/${id}`);
  }
}
