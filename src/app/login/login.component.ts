import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppFacade} from '../app.facade';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {first} from 'rxjs/operators';
import {User} from '../modules/iface.module';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit{

  form: FormGroup;
  returnUrl: string;

  constructor(
    private appFacade: AppFacade,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.appFacade.setIsTaskPage(false);
    });
  }


  login() {
    const val = this.form.value;
    if (val.login && val.password) {
      this.authenticationService.login(val.login, val.password)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
            console.log(this.appFacade.getCurrentUser().data.firstname,
              this.appFacade.getCurrentUser().data.lastname,
              +this.appFacade.getCurrentUser().exp - Math.round(new Date().getTime() / 1000));
          },
          error => {
            console.log(error);
          }
        );
    }
  }
}
