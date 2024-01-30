import { Component } from '@angular/core';
import { UserAuthenService } from '../../Services/user-auth.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserApiService } from '../../Services/user-api.service';
import { Iuser } from '../../models/iuser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './login-auth.component.html',
  styleUrl: './login-auth.component.scss'
})
export class LoginAuthComponent {
    userLog: boolean=true;
    userForm: FormGroup;
      user:Iuser = {} as Iuser;

  constructor(private userAuthService: UserAuthenService, private formbuilder: FormBuilder, private userService:UserApiService, private router:Router ) {
    this.userForm = this.formbuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      mobileNumbers: this.formbuilder.array([]),
      address: this.formbuilder.group({
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        street: ['', Validators.required]
      }),
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }
  get fullName(){
    return this.userForm.get('fullName');
  }
  get email(){
    return this.userForm.get('email');
  }
    get password(){
    return this.userForm.get('password');
  }
  get mobileNumbers(): FormArray {
      return this.userForm.get('mobileNumbers') as FormArray;
  }

    createMobileNumber(): FormGroup {
    return this.formbuilder.group({
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
  }

    addMobileNumber(): void {
    this.mobileNumbers.push(this.createMobileNumber());
  }

  removeMobileNumber(index: number): void {
    this.mobileNumbers.removeAt(index);
  }
  adduser() {
    const newUser = this.userForm.value;
    this.userService.addNewUser(newUser).subscribe({
    next:(u)=>{
      console.log(u);
      this.router.navigate(['products'])
    },
    error:(err)=>{
      console.log(err);

    }
  })
}

  ngOnInit(): void {

  }

}
