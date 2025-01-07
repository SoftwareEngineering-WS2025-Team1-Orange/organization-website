import { Injectable } from '@angular/core';
import { AuthApi, Configuration, NGOApi } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  config = new Configuration({ basePath: 'preview-mainframe.sokutan.de' });
  ngo = new NGOApi(this.config);
  auth = new AuthApi(this.config);
}
