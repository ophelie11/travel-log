import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth/auth/auth.service';
import { User } from 'src/app/models/User';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  user?: User
  userName : string;

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,
    private userService: UserService,
  ) { 
    this.auth.getUser$().subscribe(user => this.user = user);
  }


  ngOnInit() {
  }

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/auth/login");
  }

  deleteUser(): void {
    this.userService.deleteUser$(this.user.id).subscribe(() => {
      this.logOut();
    });
  }

   updateUser() {
    this.router.navigateByUrl('auth/update-user');
    // return this.user.id;
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
           }
  //       });
  //}

}
