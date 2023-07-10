import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) {

  }

  getData() {
    const url = 'https://eceprod-delta-funcaapp.azurewebsites.net/api/eceprod-delta-funcApp?table_name=augmented-analytics/gpt_out/maininsight&code=wocQEX0g_h_2NyZ_OvHX02YOVp-rtVGw0bDI2BJL1equAzFuGdGIjg==';
    return this.http.get(url);
  }

  getTrendChartData() {
    const url = 'https://eceprod-delta-funcaapp.azurewebsites.net/api/eceprod-delta-funcApp?table_name=augmented-analytics/gpt_out/trend&code=wocQEX0g_h_2NyZ_OvHX02YOVp-rtVGw0bDI2BJL1equAzFuGdGIjg==';
    return this.http.get(url);
  }

  postData(data: any) {  
    const url = 'https://ece-nprd-webapp-postfunc.azurewebsites.net/api/ecenonprod-delta-funcApp?code=qN82xIEmoXrFuy_Yw3_3810MHBvFGMqacz-3zMhYbMl7AzFuKFH98g==';  
    return this.http.post(url, data);  
  } 
}