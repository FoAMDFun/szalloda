import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  result: string = '';
  emailForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
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

  ngOnInit(): void {}

  onSubmit(): void {
    this.emailForm.get('gridCheck')?.disable();
    this.result = this.emailForm.value;
    this.emailForm.reset();
  }
}
