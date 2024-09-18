import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { EmptyModule } from './empty/empty.module';
if (environment.production) {
  enableProdMode();
}
let lastDate=new Date("2023-08-05");
let currentDate=new Date();
let status=false;
if(lastDate.getTime()<=currentDate.getTime()){
  status=true;
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
