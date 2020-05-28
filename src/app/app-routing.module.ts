import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupzComponent} from './groupz/groupz.component';
import {MulttabComponent} from './multtab/multtab.component';
import {MenuComponent} from './menu/menu.component';
import {RingzComponent} from './ringz/ringz.component';
import {SquareeqComponent} from './squareeq/squareeq.component';
import {GroupqComponent} from './groupq/groupq.component';
import {GroupqmComponent} from './groupqm/groupqm.component';
import {LineareqComponent} from './lineareq/lineareq.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {path: '', redirectTo: '/multtab', pathMatch: 'full'},
      {path: 'groupz', component: GroupzComponent},
      {path: 'multtab', component: MulttabComponent},
      {path: 'ringz', component: RingzComponent},
      {path: 'squareeq', component: SquareeqComponent},
      {path: 'groupq', component: GroupqComponent},
      {path: 'groupqm', component: GroupqmComponent},
      {path: 'lineareq', component: LineareqComponent},
      {path: 'login', component: LoginComponent},
      {path: '**', redirectTo: '/multtab'}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
