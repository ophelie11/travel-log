import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { RegisterRequest } from "../../models/register-request";

/**
 * Register page.
 */
@Component({
  templateUrl: "register.page.html",
})
export class RegisterPage {
  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  registerRequest: RegisterRequest;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  registerError: boolean;

  constructor(private auth: AuthService, private router: Router) {
    this.registerRequest = {
      name: undefined,
      password: undefined,
    };
  }

  /**
   * Called when the register form is submitted.
   */
  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    // Hide any previous register error.
    this.registerError = false;

    // Perform the authentication request to the API.
    this.auth.register$(this.registerRequest).subscribe({
      next: () => this.router.navigateByUrl("/"),
      error: (err) => {
        this.registerError = true;
        console.warn(`Register failed: ${err.message}`);
      },
    });
  }
}