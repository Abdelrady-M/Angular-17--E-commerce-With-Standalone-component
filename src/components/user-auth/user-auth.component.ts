import { Component } from '@angular/core';
import { UserAuthenService } from '../../Services/user-auth.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss'
})
export class UserAuthComponent {
  isUser:boolean = true;
  constructor(private userAuth: UserAuthenService) {
    this.isUser= this.userAuth.isUserLogged
  }

  loginFunc() {
    this.userAuth.login("asd@gmail.com", "123456")
    this.isUser = this.userAuth.isUserLogged
  }
  logoutFunc() {
    this.userAuth.logout
    this.isUser = this.userAuth.isUserLogged
  }
}
