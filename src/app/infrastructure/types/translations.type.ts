export interface TranslationsResponse {
  translations: Translation[];
}

export interface Translation {
  detectedLanguageCode: string;
  text: string;
}
