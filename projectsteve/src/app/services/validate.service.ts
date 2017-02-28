import { Injectable } from '@angular/core';
import {isNullOrUndefined} from "util";
import {isUndefined} from "util";

@Injectable()
export class ValidateService {

  constructor() { }

  // Function to insure that all fields that are required isn't blank or empty.
  validateRegister(user) {
    if (user.firstname == undefined || user.lastname == undefined || user.email == undefined ||
      user.username == undefined || user.password == undefined || user.phonenumber == undefined) {
      return false;
    } else {
        return true;
    }
  }

  // Function to validate the email to insure the email is in email format.
  validateEmail(email) {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(email);
  }

  // Function to validate the phonenumber to insure the phonenumber is in email format.
  validatePhoneNumber(phonenumber) {
    const regExp = /^(\([0-9]{3}\)\s?|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    return regExp.test(phonenumber);
  }
}
