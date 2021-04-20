import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslationPageComponent } from './page/translation-page/translation-page.component';

const routes: Routes = [
  {
    path: '',
    component: TranslationPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
