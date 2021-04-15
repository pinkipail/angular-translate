import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IAMTokenInfo } from '../types/iam-token-response.type';

@Injectable()
export class AuthHttpService {
  private OAuthToken = 'AQAAAABFOZkYAATuwawLSHaC9Eh_iKfKnYauopI';

  constructor(private http: HttpClient) { }

  public getIAMToken(): Observable<IAMTokenInfo> {
    const body = { yandexPassportOauthToken: this.OAuthToken };
    return this.http.post<IAMTokenInfo>('/iam/v1/tokens', body);
  }
}
