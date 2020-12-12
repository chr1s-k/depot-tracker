import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from '@angular/compiler';
import { URLS } from '@chris-k-software/api-interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class YahooService {
  readonly prefix = 'api/';

  constructor(private http: HttpClient) {}

  symbolTypeahead$(q: string): Observable<Quote[]> {
    const url = this.prefix + URLS.assetSymbolTypeahedV1;
    const params = new HttpParams().set('q', q);
    return this.http.get<Quote[]>(url, { params });
  }
}
