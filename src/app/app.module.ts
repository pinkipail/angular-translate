import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthHttpService } from './infrastructure/services/auth-http.service';
import { AUTH_INTERCEPTOR } from './infrastructure/interceptors/auth.interceptor';
import { TranslationHttpService } from './infrastructure/services/translation-http.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AuthHttpService,
    AUTH_INTERCEPTOR,
    TranslationHttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
