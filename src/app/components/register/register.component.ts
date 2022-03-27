import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from 'src/app/store/actions/auth.action';
import { AuthState } from 'src/app/store/reducers/auth.reducer';
import { PasswordValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  emailForm: FormGroup = new FormGroup({});

  ngOnInit(): void {}
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AuthState>
  ) {
    this.emailForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        passwordFirst: ['', [Validators.required, Validators.minLength(8)]],
        passwordSecond: ['', [Validators.required, Validators.minLength(8)]],
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
      },
      { validator: PasswordValidator('passwordFirst', 'passwordSecond') }
    );
  }

  onSubmit(): void {
    this.emailForm.get('gridCheck')?.disable();
    this.store.dispatch(
      register({
        email: this.emailForm.get('email')?.value,
        password: this.emailForm.get('passwordFirst')?.value,
      })
    );
    this.emailForm.reset();
  }
}
