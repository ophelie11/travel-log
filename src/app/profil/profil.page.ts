import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth/auth/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router
  ) { }

  ngOnInit() {
  }

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/auth/login");
  }

  deleteUser() {
  }

  // updateUser() {
  //   this.userService.update(this.id, this.form.value)
  //       .pipe(first())
  //       .subscribe({
  //           next: () => {
  //               this.alertService.success('User updated', { keepAfterRouteChange: true });
  //               this.router.navigate(['../../'], { relativeTo: this.route });
  //           },
  //           error: error => {
  //               this.alertService.error(error);
  //               this.loading = false;
  //           }
  //       });
  //}

}
