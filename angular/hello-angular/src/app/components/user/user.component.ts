import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users:UserDto[]
  userForm:FormGroup
  // constructor injection for services
  constructor(private service:UserService) { }

  ngOnInit() {
    this.getUsers();
    this.userForm = this.buildForm();
  }

  buildForm():FormGroup{
    return this.service.buildUserForm();
  }
  getUsers(){
    this.users = this.service.getUsers();
  }

  addUser(user:UserDto){
    this.service.addUser(user);
    this.getUsers();
  }

  deleleUser(user:UserDto){
    this.service.deleteUser(user);
    this.getUsers();
  }

  // events
  editUser(user){
    console.log(user.dob.getDate()+"-"+user.dob.getMonth()+"-"+user.dob.getFullYear())
    this.userForm.patchValue({
      id: user.id,
      name: user.name,
      email: user.email,
      salary: user.salary,
      dob: user.dob
    });
  }

  saveUser(){
    let user;
    user = this.users.filter(u => u.id == this.userForm.value.id);
    console.log(user[0])
    // this.users = this.users.filter(u=> u !== user[0]);
    this.service.deleteUser(user[0]);
    this.getUsers();
    this.addUser({
      id: this.userForm.value.id,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      salary: this.userForm.value.salary,
      dob: new Date(this.userForm.value.dob)
    });
  }
}
