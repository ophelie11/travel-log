import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { RegisterRequest } from "src/app/models/register-request";
import { AuthRequest } from "src/app/models/auth-request";
/**
 * Update login page.
 */
@Component({
  selector: 'app-update-user',
  templateUrl: "update-user.page.html",
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage {

  // user?: AuthRequest
  // editUser : RegisterRequest;
  // userId: string;

  // constructor(private router: Router, private auth : UserService, private route: ActivatedRoute) {
  //   this.editUser = {
  //     name: undefined,
  //     password: undefined,
  //   };
  //   this.userId = this.route.snapshot.params.id;
    
  //   this.auth.getUser$().subscribe(user => this.user= user);
  // }

  // onSubmit(form: NgForm) {
  //   if (form.invalid) {
  //     return;
  //   }
    
  //   this.user.editUser$(this.userId, this.editUser).subscribe({
  //     next: () => this.router.navigateByUrl("/"),
  //   });
  // }

  }