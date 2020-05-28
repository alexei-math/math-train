import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppFacade} from '../app.facade';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form: FormGroup;

  constructor(
    private appFacade: AppFacade,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit() {
    this.appFacade.setIsTaskPage(false);
  }


  login() {
    const val = this.form.value;
    if (val.login && val.password) {
      this.authenticationService.login(val.login, val.password)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log(error);
          }
        );
    }
  }
}
