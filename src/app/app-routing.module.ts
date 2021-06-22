import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {AdminHomepageComponent} from "./pages/admin-homepage/admin-homepage.component";
import {CarParkComponent} from "./pages/car-park/car-park.component";
import {FormAddComponent} from "./pages/form-add/form-add.component";
import {ReservationsComponent} from "./pages/reservations/reservations.component";
import {LoginComponent} from "./pages/login/login.component";
import {NotFoundComponent} from "./pages/error/not-found/not-found.component";
import {UnathorizedComponent} from "./pages/error/unathorized/unathorized.component";

import {AuthGuard} from "./guards/auth.guard";
import {Role} from "./modules/role";

const routes: Routes = [
  {path: '', redirectTo: 'reservations', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'homepage', component: AdminHomepageComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN]}},
  {path: 'carPark', component: CarParkComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.CUSTOMER]}},
  {path: 'form-add', component: FormAddComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.CUSTOMER]}},
  {path: 'homepage-customer', component: ReservationsComponent, canActivate: [AuthGuard], data: {roles: [Role.CUSTOMER]}},
  {path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.CUSTOMER]}},
  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnathorizedComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error : any ) => {
      console.log(error)
      this.router.navigate(['/404'])
    }
  }
}
