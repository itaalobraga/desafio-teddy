import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

type User = {
  username: string;
  remember: boolean;
  expiresAt: number;
};

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
      const { remember, expiresAt } = JSON.parse(storedUser) as User;

      if (remember || Date.now() < expiresAt) {
        this.redirectToPanel();
      }
    }
  }

  redirectToPanel(): void {
    const baseUrl = window.location.origin;

    window.location.href = `${baseUrl}/about`;
  }

  onSubmit() {
    const isValidForm = this.loginForm.valid;

    if (isValidForm) {
      const { remember, username } = this.loginForm.value;

      const expiresAt = Date.now() + 10000; // 10 segundos

      localStorage.setItem(
        '@teddy-challenge',
        JSON.stringify({ username, remember, expiresAt })
      );

      const baseUrl = window.location.origin;

      window.location.href = `${baseUrl}/about`;
    }
  }
}