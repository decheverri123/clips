import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  credentials = {
    email: '',
    password: '',
  };

  showAlert = false;
  alertMessage = 'Please wait.';
  alertColor = 'blue';
  inSubmission = false;

  emailValidationPattern =
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";

  async login() {
    this.showAlert = true;
    this.alertMessage = 'Please wait...';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    } catch (error) {
      this.inSubmission = false;
      this.alertMessage = 'Error occurred.';
      this.alertColor = 'red';
      return;
    }
    this.alertMessage = 'Success! You are now logged in.';
    this.alertColor = 'green';
  }
}
