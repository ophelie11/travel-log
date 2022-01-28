import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateUser } from '../models/createUser';
import { User } from '../models/user';
import { RegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  createUser$(createUser : CreateUser){
    return this.http.post(environment.apiUrl + "/users", createUser);
  }

  getUser$(){
    return this.http.get<User[]>(environment.apiUrl + "/users")
  }

  deleteUser$(id : string){
    return this.http.delete(environment.apiUrl + "/users/" + id)
  }

  editUser$(id : string, editUser : RegisterRequest){
    return this.http.patch(environment.apiUrl + "/users/" + id, editUser)
  }
}
