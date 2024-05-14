import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  getsentiment(payload: any): Observable<any> {
    return this.http.post<any>('https://rahul.lab.bravishma.com/analyze-sentiment', payload);
  }
  getOverallSenti(payload: any): Observable<any> {
    return this.http.post<any>('https://rahul.lab.bravishma.com/overall-sentiment', payload);
  }
  translateData(message: any): Observable<any> {
    return this.http.get<any>('https://rahul.lab.bravishma.com/translate-message?message=' + message +'&langs=en&langs=hi');
  }
}

