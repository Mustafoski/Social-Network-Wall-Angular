import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: any;

  constructor(private http: HttpClient) {}

  public createNewUser(dataObj: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/users', dataObj).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  public getUser(email: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/users?email=' + email).subscribe(
        (res) => resolve(res),
        (err) => reject(err)
      );
    });
  }
}
