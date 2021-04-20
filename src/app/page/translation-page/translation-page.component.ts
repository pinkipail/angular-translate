import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationHttpService } from '../../infrastructure/services/translation-http.service';
import { Language } from 'src/app/infrastructure/types/languages.type';
import { TranslationLog } from '../../infrastructure/types/translation-log.type';
import { TranslationStorageService } from '../../infrastructure/services/translation-storage.service';
import { Translation } from 'src/app/infrastructure/types/translations.type';

const DEFAULT_LANGUAGE: Language = {code: 'en', name: 'English'};

@Component({
  selector: 'app-translation-page',
  templateUrl: './translation-page.component.html',
  styleUrls: ['./translation-page.component.scss']
})
export class TranslationPageComponent implements OnInit {

  public listLanguages: Language[];
  public source = new FormGroup({
    text: new FormControl(null, [Validators.required, Validators.maxLength(5000)]),
    language: new FormControl(null),
  });

  public target = new FormGroup({
    text: new FormControl(null),
    language: new FormControl(null),
  });

  constructor(
    private translation: TranslationHttpService,
    private translationStorage: TranslationStorageService
    ) { }

  public ngOnInit(): void {
    this.initListLanguages();
    this.setDefaultTargetLanguage();
  }

  public translate(): void {
    this.source.get('text').markAsTouched();
    if (this.source.get('text').valid) {
      const sourceText = this.source.get('text').value;
      const targetLanguageCode = this.target.get('language').value?.code || 'en';
      const sourceLanguageCode = this.source.get('language').value?.code;
      this.translation
        .translate(sourceText, targetLanguageCode, sourceLanguageCode)
        .subscribe(res => {
          this.handlerTranslateResponse(res);
          this.addTranslationToStorage();
        });
    }
  }

  public clearAreas(): void {
    this.source.reset();
    this.target.reset();
    this.setDefaultTargetLanguage();
  }

  public select(translation: TranslationLog): void {
    this.source.patchValue(translation.source);
    this.target.patchValue(translation.target);
  }

  private initListLanguages(): void {
    this.translation
      .getListLanguages()
      .subscribe(res => {
        this.listLanguages = res;
      });
  }

  private handlerTranslateResponse(translation: Translation): void {
    const text = translation.text;
    const detectedLanguage = this.findLanguageByCode(translation.detectedLanguageCode);
    this.target.get('text').setValue(text);
    if (detectedLanguage) {
      this.source.get('language').setValue(detectedLanguage);
    }
  }

  private addTranslationToStorage(): void {
    const translationLog: TranslationLog = {
      source: this.source.value,
      target: this.target.value
    };
    this.translationStorage.add(translationLog);
  }

  private setDefaultTargetLanguage(): void {
    this.target.get('language').setValue(DEFAULT_LANGUAGE);
  }

  private findLanguageByCode(code: string): Language {
    return this.listLanguages.find(language => language.code === code);
  }
}
