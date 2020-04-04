import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { GroupzComponent } from './groupz/groupz.component';
import { FootComponent } from './foot/foot.component';
import { HeadComponent } from './head/head.component';
import { SquareeqComponent } from './squareeq/squareeq.component';
import { MathJaxModule } from 'ngx-mathjax';
import { KatexModule} from 'ng-katex';
import { MulttabComponent } from './multtab/multtab.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    GroupzComponent,
    FootComponent,
    HeadComponent,
    SquareeqComponent,
    MulttabComponent
  ],
  imports: [
    NgbModule,
    // NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    MathJaxModule.forRoot({
      version: '2.7.5',
      config: 'TeX-AMS_HTML',
      hostname: 'cdnjs.cloudflare.com'
    }),
    KatexModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
