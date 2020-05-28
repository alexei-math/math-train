import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { GroupzComponent } from './groupz/groupz.component';
import { FootComponent } from './foot/foot.component';
import { HeadComponent } from './head/head.component';
import { SquareeqComponent } from './squareeq/squareeq.component';
import { MathJaxModule } from 'ngx-mathjax';
import { KatexModule} from 'ng-katex';
import { MulttabComponent } from './multtab/multtab.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { GcdComponent } from './gcd/gcd.component';
import { ShowprogressComponent } from './showprogress/showprogress.component';
import { GroupqComponent } from './groupq/groupq.component';
import { RingzComponent } from './ringz/ringz.component';
import { GroupqmComponent } from './groupqm/groupqm.component';
import {AppRoutingModule} from './app-routing.module';
import {MenuDirective} from './directives/menu.directive';
import {TimerTaskService} from './services/timer-task.service';
import {HttpClientModule} from '@angular/common/http';
import {ApiServices} from './services/api.services';
import { LineareqComponent } from './lineareq/lineareq.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {LoginComponent} from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {AutofocusDirective} from './directives/autofocus.directive';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    GroupzComponent,
    FootComponent,
    HeadComponent,
    SquareeqComponent,
    MulttabComponent,
    ViewtaskComponent,
    GcdComponent,
    ShowprogressComponent,
    GroupqComponent,
    RingzComponent,
    GroupqmComponent,
    MenuDirective,
    AutofocusDirective,
    LineareqComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MathJaxModule.forRoot({
      version: '2.7.5',
      config: 'TeX-AMS_HTML',
      hostname: 'cdnjs.cloudflare.com'
    }),
    KatexModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [TimerTaskService, ApiServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
