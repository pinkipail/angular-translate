import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LanguagesResponse, Language } from '../types/languages.type';
import { Translation, TranslationsResponse } from '../types/translations.type';

@Injectable()
export class TranslationHttpService {

  private folderId = 'b1gsmf0fp8ji10cpv0hc';

  constructor(private http: HttpClient) { }

  public translate(text: string, targetLanguageCode: string, sourceLanguageCode?: string): Observable<Translation> {
    const body = {
      folderId: this.folderId,
      texts: [text],
      sourceLanguageCode,
      targetLanguageCode,
    };
    return this.http.post<TranslationsResponse>('/translate/v2/translate', body)
      .pipe(
        map(res => res.translations[0]),
      );
  }

  public getListLanguages(): Observable<Language[]> {
    const body = { folder_id: this.folderId };
    return this.http
      .post<LanguagesResponse>('/translate/v2/languages', body)
      .pipe(
        map(res => res.languages.filter(item => item.name)),
      );
  }
}
