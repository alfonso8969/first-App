import { Component, inject } from '@angular/core';
import { Person } from '../../../class/person';
import { PersonService } from '../../../persons/data-access/person.service';
import { LoginService } from '../../../auth/data-access/login.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand">Customers</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                [routerLink]="'/dashboard'"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" [routerLink]="'/persons'">Customers</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <div *ngIf="loginService.isAuthenticated(); else loginTemplate">
              <button
                class="btn btn-outline-success p-2 mx-2"
                (click)="logout()"
              >
                logout
              </button>

              <span class="text-light"
                >{{
                  customer
                    ? 'Welcome ' +
                      customer.name.split(' ')[0] +
                      ' ' +
                      customer.name.split(' ')[1]
                    : 'Usuario no iniciado'
                }}
                &nbsp;&nbsp;</span
              >

              <img
                class="img-thumbnail rounded-circle"
                width="50px"
                height="50px"
                src="{{
                  customer ? customer.image : '../../../assets/images/user.jpg'
                }}"
              />
            </div>
            <ng-template #loginTemplate>
              <a
                [routerLink]="['/auth/login']"
                routerLinkActive="router-link-active"
                class="btn btn-outline-success"
              >
                Login
              </a>
              <span class="text-light p-2">Usuario no iniciado &nbsp;&nbsp;</span>
              <img
                class="img-thumbnail rounded-circle"
                width="50px"
                height="50px"
                src="../../../assets/images/user.jpg"
              />
            </ng-template>
          </form>
        </div>
      </div>
    </nav>
  `,
  imports: [CommonModule, RouterModule],
})
export default class NavbarComponent {
  router = inject(Router);
  personService = inject(PersonService);
  loginService = inject(LoginService);

  customer!: Person;

  constructor() {
    if (this.loginService.isAuthenticated()) {
      this.customer = JSON.parse(sessionStorage.getItem('userLogged')!);
    }
  }

  logout() {
    this.loginService.logout();
  }
}
