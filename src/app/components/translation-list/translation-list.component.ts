import { Component, EventEmitter, Output } from '@angular/core';
import { TranslationLog } from 'src/app/infrastructure/types/translation-log.type';

@Component({
  selector: 'app-translation-list',
  templateUrl: './translation-list.component.html',
  styleUrls: ['./translation-list.component.scss'],
})
export class TranslationListComponent {

  @Output() public select = new EventEmitter<TranslationLog>();

  public listTranslations: TranslationLog[] = [
    {
      source: {
        text: 'persists',
        language: {
          name: 'английский',
          code: 'en',
        }
      },
      target: {
        text: 'сохраняется',
        language: {
          name: 'русский',
          code: 'ru',
        },
      },
    },
    {
      source: {
        language: {
          name: 'русский',
          code: 'ru',
        },
        text: `Во втором классе проверяется сформированность умения читать целыми словами и словосочетаниями; осознание общего смысла и содержания прочитанного текста при темпе чтения вслух не менее 45-50 слов в минуту (на конец года); умение использовать паузы, соответствующие знаки препинания, интонации, передающие характерные особенности героев.
        В третьем классе наряду с проверкой сформированности умения читать целыми словами основными задачами контроля являются достижение осмысления прочитанного текста при темпе чтения не менее 65-70 слов в минуту (вслух) и 85-90 слов в минуту («про себя»); проверка выразительности чтения подготовленного текста прозаических произведений и стихотворений; использование основных средств выразительности: пауз, логических ударений, интонационного рисунка.
        В 4 классе проверяется темп чтения, осознание прочитанного, выделение главной мысли, чтение без ошибок целыми словами, выразительность. Темп чтения не менее 85-90 слов в минуту (вслух) и 105-110 слов в минуту («про себя»).`,
      },
      target: {
        language: {
          name: 'английский',
          code: 'en',
        },
        text: `In the second grade, the formation of the ability to read with whole words and phrases is checked; awareness of the general meaning and content of the text read at a rate of reading aloud of at least 45-50 words per minute (at the end of the year); the ability to use pauses, appropriate punctuation marks, intonations that convey the characteristic features of the characters.
        In the third grade, along with checking the formation of the ability to read in whole words, the main tasks of control are to achieve comprehension of the read text at a reading rate of at least 65-70 words per minute (aloud) and 85-90 words per minute (“to oneself”); checking the expressiveness of reading the prepared text of prose works and poems; the use of basic means of expression: pauses, logical stress, intonation pattern.
        In grade 4, the pace of reading, reading comprehension, highlighting the main idea, reading without errors in whole words, expressiveness are tested. The reading rate is not less than 85-90 words per minute (aloud) and 105-110 words per minute (“to myself”).`,
      },
    },
  ];

  public selectLog(translation: TranslationLog): void {
    this.select.emit(translation);
  }

}
