import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyWebComponentService {
  private tokenUrl = 'https://dev224482.service-now.com/oauth_token.do';
  private incidentUrl = 'https://dev224482.service-now.com/api/now/v2/table/incident';

  constructor(private http: HttpClient) { }

  getToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic MmY4MDIyYmVlNTc1MDIxMGViMjYwMGJiNDg3YTE4NTM6K25FakV1ZjBcTA=='
    });

    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', '2f8022bee5750210eb2600bb487a1853');
    body.set('client_secret', '+nEjEuf0`L');
    body.set('username', 'ticketraiseapi');
    body.set('password', 'TFvm>.R+0A8#CJ}bcSg#h]gaS5eI9_zcWlxe:[Xvj>,[D4%p%sXIjqYU>Wz,jOX^0P^my(3gsmOmb*F8*f<PPKW>m@;ETZ5^A]zF');

    return this.http.post<any>(this.tokenUrl, body.toString(), { headers: headers });
  }

  createIncident(token: string, incidentData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.incidentUrl, incidentData, { headers: headers });
  }
}
