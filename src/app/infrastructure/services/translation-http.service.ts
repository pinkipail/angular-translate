import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LanguagesResponse } from '../types/languages.type';
import { TranslationsResponse } from '../types/translations.type';

@Injectable()
export class TranslationHttpService {

  private folderId = 'b1gsmf0fp8ji10cpv0hc';

  constructor(private http: HttpClient) { }

  public translate(body: any): Observable<TranslationsResponse> {
    body.folderId = this.folderId;
    return this.http.post<TranslationsResponse>('/translate/v2/translate', body);
  }

  public getListLanguages(): Observable<LanguagesResponse> {
    const body = { folder_id: this.folderId };
    return this.http.post<LanguagesResponse>('/translate/v2/languages', body);
  }
}
