import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IUser from '../../models/user.model';

const validationExpression =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private auth: AuthService) {}

  inSubmission = false;
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.email, Validators.required]);
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(validationExpression),
  ]);
  confirm_password = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
  ]);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
  });

  alertMessage = 'Please wait. Your account is being created.';
  showAlert = false;
  alertColor = 'blue';

  async register() {
    this.showAlert = true;
    this.alertMessage = 'Please wait. Your account is being created.';
    this.alertColor = 'blue';
    this.inSubmission = true;
    const { email, password } = this.registerForm.value;

    try {
      await this.auth.createUser(this.registerForm.value as IUser);
    } catch (error) {
      console.log(error);
      this.alertMessage = 'Unexpected error occurred.';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }

    this.alertMessage = 'Your account has been created.';
    this.alertColor = 'green';
  }
}
