import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthHttpService } from './infrastructure/services/auth-http.service';
import { AUTH_INTERCEPTOR } from './infrastructure/interceptors/auth.interceptor';
import { TranslationHttpService } from './infrastructure/services/translation-http.service';
import { TranslationPageComponent } from './page/translation-page/translation-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './components/select/select.component';
import { TranslationListComponent } from './components/translation-list/translation-list.component';
import { TranslationStorageService } from './infrastructure/services/translation-storage.service';



@NgModule({
  declarations: [
    AppComponent,
    TranslationPageComponent,
    SelectComponent,
    TranslationListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatCardModule,
    MatSidenavModule,
  ],
  providers: [
    AuthHttpService,
    AUTH_INTERCEPTOR,
    TranslationHttpService,
    TranslationStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
