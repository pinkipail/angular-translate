import { Language } from './languages.type';

export interface TranslationLog {
  source: {
    text: string,
    language: Language,
  };
  target: {
    text: string,
    language: Language,
  };
}
