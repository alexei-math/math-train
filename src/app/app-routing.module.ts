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
import {AuthGuard} from './services/authguard.service';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {path: '', redirectTo: '/multtab', pathMatch: 'full'},
      {path: 'groupz', component: GroupzComponent, canActivate: [AuthGuard]},
      {path: 'multtab', component: MulttabComponent},
      {path: 'ringz', component: RingzComponent, canActivate: [AuthGuard]},
      {path: 'squareeq', component: SquareeqComponent, canActivate: [AuthGuard]},
      {path: 'groupq', component: GroupqComponent, canActivate: [AuthGuard]},
      {path: 'groupqm', component: GroupqmComponent, canActivate: [AuthGuard]},
      {path: 'lineareq', component: LineareqComponent, canActivate: [AuthGuard]},
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
