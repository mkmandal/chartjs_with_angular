import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {
//public apiURL="";
  constructor(private _http:HttpClient) { }

 dailyForeCast():Observable<any>
  {

    return this._http.get('/assets/data.json');
  }

}