export interface TranslateBody {
  sourceLanguageCode?: string;
  targetLanguageCode: string;
  format?: string;
  texts: string[];
  folderId: string;
  model?: string;
  glossaryConfig?: GlossaryConfig;
}

interface GlossaryConfig {
  glossaryData?: {
    glossaryPairs: GlossaryPairs[];
  };
}

interface GlossaryPairs {
  sourceText: string;
  translatedText: string;
}
