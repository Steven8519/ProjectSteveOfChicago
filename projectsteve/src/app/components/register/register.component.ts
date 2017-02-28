import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstname: String;
  lastname: String;
  email: String;
  username: String;
  password: String;
  phonenumber: String;
  occupation: String;

  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  // Submit data to form
  onSubmit() {
    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
      password: this.password,
      phonenumber: this.phonenumber,
      occupation: this.occupation
    };

    // Validate fields in the form to make sure all fields have data.
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show("Please fill in the form: ", {cssClass: "alert-danger", timeout: 6000 });
      return false;
    }

    // Validate the email field in the form to insure the email is in email format.
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Please valide email: ", {cssClass: "alert-danger", timeout: 6000 });
      return false;
    }

    // To viladate the phonenumber field to insure the phone number is in valide phone number format.
    if(!this.validateService.validatePhoneNumber(user.phonenumber)) {
      this.flashMessage.show("Please use a valide phone number: ", {cssClass: "alert-danger", timeout: 6000 });
      return false;
    }
  }

}
