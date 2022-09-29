import { usersAPI } from './../utils/URLs';
import { UserDto } from './../../model/dto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getUserById(id: string): Observable<UserDto>{
    return this.http.get<UserDto>(usersAPI + `/${id}`);
  }
  getUsers(): Observable<UserDto[]>{
    return this.http.get<UserDto[]>(usersAPI);
  }

}
