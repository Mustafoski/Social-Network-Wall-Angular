import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.userService
      .getUser(this.loginForm.value.email)
      .then((res: any) => {
        if (res.length === 0) {
          console.log('Account does not exist');
          this.snackbar.open('Account does not exist', 'ok');
        } else {
          if (res[0].password === this.loginForm.value.password) {
            console.log('matched');
            this.snackbar.open('Login successfull', 'ok');
            this.userService.user = res[0];
            localStorage.setItem('user', JSON.stringify(res[0]));
            this.router.navigate(['/posts']);
          } else {
            console.log('Incorrect password');
            this.snackbar.open('Incorrect Password', 'ok');
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
