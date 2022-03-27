import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/actions/auth.action';
import { AuthState } from 'src/app/store/reducers/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  emailForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AuthState>
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      gridCheck: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.emailForm.get('gridCheck')?.disable();
    this.store.dispatch(
      login({
        email: this.emailForm.get('email')?.value,
        password: this.emailForm.get('password')?.value,
      })
    );
    this.emailForm.reset();
  }
}
