import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GifsResponse, Gif } from '../interface/gifs.interface';
@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'EFG73gvzl3dr2ZBfR6UJkBixhTdP615K';
  private serviceURL: string = 'http://api.giphy.com/v1/gifs';
  private _historial: string[];
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }
  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.slice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);
    this.http
      .get<GifsResponse>(`${this.serviceURL}/search`, { params })
      .subscribe((resp) => {
      //  console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
   // console.log(this._historial);
  }
}
