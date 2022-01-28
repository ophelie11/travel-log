import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../auth/auth.service";
import { AuthRequest } from "../../models/auth-request";
import { UserService } from "src/app/services/user.service";
import { RegisterRequest } from "src/app/models/register-request";

/**
 * Update login page.
 */
@Component({
  templateUrl: "update-user.page.html",
})
export class UpdateUserPage {
  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  authRequest: RegisterRequest;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  loginError: boolean;

  constructor(private auth: AuthService, private router: Router, private user: UserService) {
    this.authRequest = {
      name: undefined,
      password: undefined,
    };
    this.auth.getUser$().subscribe(user => {
      this.authRequest.name = user.name;
    });
  }

  /**
   * Called when the login form is submitted.
   */
  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    // Hide any previous login error.
    this.loginError = false;

    // Perform the authentication request to the API.
    this.auth.getUser$().subscribe(user => {
      this.user.editUser$(user.id, this.authRequest).subscribe({
        next: () => this.router.navigateByUrl("/home"),
      });
    });

  }
}