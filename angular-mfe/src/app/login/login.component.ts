import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false, Validators.required],
    });
  }

  ngOnInit() {
    const storedUser = localStorage.getItem('@teddy-challenge');

    if (storedUser) {
      this.redirectToPanel();
    }
  }

  redirectToPanel(): void {
    const baseUrl = window.location.origin;

    window.location.href = `${baseUrl}/panel`;
  }

  stayLoggedIn() {
    const { remember, username } = this.loginForm.value;

    if (remember) {
      localStorage.setItem('@teddy-challenge', JSON.stringify({ username }));
    }
  }

  onSubmit() {
    const isValidForm = this.loginForm.valid;

    if (isValidForm) {
      this.stayLoggedIn();

      const baseUrl = window.location.origin;

      window.location.href = `${baseUrl}/panel`;
    }
  }
}
