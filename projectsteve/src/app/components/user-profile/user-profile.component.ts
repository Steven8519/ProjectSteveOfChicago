import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: Object;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getUserInfo().subscribe(profile => {
      this.user = profile.user;
    },

    error => {
      console.log(error);
      return false;
    });
  }

}
