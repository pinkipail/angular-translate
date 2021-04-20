import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationHttpService } from '../../infrastructure/services/translation-http.service';
import { Language } from 'src/app/infrastructure/types/languages.type';

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

  constructor(private translation: TranslationHttpService) { }

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
          const text = res.text;
          const detectedLanguage = this.findLanguageByCode(res.detectedLanguageCode);
          this.target.get('text').setValue(text);
          if (detectedLanguage) {
            this.source.get('language').setValue(detectedLanguage);
          }
        });
    }
  }

  public clearAreas(): void {
    this.source.reset();
    this.target.reset();
    this.setDefaultTargetLanguage();
  }

  private initListLanguages(): void {
    this.translation
      .getListLanguages()
      .subscribe(res => {
        this.listLanguages = res;
      });
  }

  private setDefaultTargetLanguage(): void {
    const defaultValue = {code: 'en', name: 'English'};
    this.target.get('language').setValue(defaultValue);
  }

  private findLanguageByCode(code: string): Language {
    return this.listLanguages.find(language => language.code === code);
  }
}
