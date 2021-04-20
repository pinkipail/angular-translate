import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslationLog } from '../types/translation-log.type';

@Injectable()
export class TranslationStorageService {

  public get all(): Observable<TranslationLog[]> {
    return this.listTranslation$.asObservable();
  }

  private listTranslation$ = new BehaviorSubject<TranslationLog[]>([]);
  private key = 'translation';

  constructor() {
    this.listTranslation$.next(this.getTranslations());
  }

  public add(translation: TranslationLog): void {
    const listTranslation: TranslationLog[] = this.getTranslations();
    listTranslation.unshift(translation);
    localStorage.setItem(this.key, JSON.stringify(listTranslation));
    this.listTranslation$.next(listTranslation);
  }

  public removeAll(): void {
    localStorage.removeItem(this.key);
    this.listTranslation$.next([]);
  }

  private getTranslations(): TranslationLog[] {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  }
}
