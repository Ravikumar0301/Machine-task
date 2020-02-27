import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})


export class TaskComponent implements OnInit {

  private formvalues: any = {};
  private addrow = true; 
  public mode: string = 'ADD';
  public editMode = 'EDIT';
  public addMode = 'ADD';
  private index_num ='';

  users = [
    {UserID : 1 , username: 'admin', password: 'admin@1234', usertypeid: 1, fullname: 'Ravikumar',  email: 'ravikumar123@gmail.com', phone: '1234567890', isactive: true},
    {UserID : 2 , username: 'admin_1', password: 'admin_1@1234', usertypeid: 2, fullname: 'Ramasamy',  email: 'ramasamy123@gmail.com', phone: '1234567890', isactive: true}
  ];

  constructor(private fb: FormBuilder) { }
  
  ngOnInit() {
  }

  userform = this.fb.group({
      username: ['', Validators.required],
      password: ['',Validators.required],
      fullname: ['',Validators.required],
      email: ['', Validators.compose(
                      [
                        Validators.required,
                        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])
                      ],
      phone:  ['', Validators.compose(
        [
          Validators.required,
          Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)])
        ],
      isactive: ['',Validators.required]
  });

  get f(){
    return this.userform.controls;
  }

  add_row(){
    if(this.userform.invalid){
      return;
    }
    this.users.push(this.userform.value);
  }

  delete_row(index) {
    console.log(index);
    this.users.splice(index, 1);
  }

  edit_row(i){
    this.mode = 'EDIT';
    this.userform.patchValue({
      username: this.users[i].username,
      password: this.users[i].password,
      usertypeid: this.users[i].usertypeid,
      fullname: this.users[i].fullname,
      email: this.users[i].email,
      phone: this.users[i].phone,
      isactive: this.users[i].isactive,
    });
    this.index_num = i;
  } 

  update_row(){
    if(this.userform.invalid){
        return;
    }
    this.users[this.index_num].username =  this.userform.value.username;
    this.users[this.index_num].password =  this.userform.value.password;
    this.users[this.index_num].usertypeid =  this.userform.value.usertypeid;
    this.users[this.index_num].fullname =  this.userform.value.fullname;
    this.users[this.index_num].email =  this.userform.value.email;
    this.users[this.index_num].phone =  this.userform.value.phone;
    this.users[this.index_num].isactive =  this.userform.value.isactive;
    this.mode = 'ADD';
    this.userform.patchValue({
      username: null,
      password: null,
      usertypeid: null,
      fullname: null,
      email: null,
      phone: null,
      isactive: null,
    });
  }

}
