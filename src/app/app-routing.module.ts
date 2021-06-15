import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminHomepageComponent} from "./pages/admin-homepage/admin-homepage.component";
import {CarParkComponent} from "./pages/car-park/car-park.component";
import {CustomFormComponent} from "./custom-component/custom-form/custom-form.component";
import {FormAddComponent} from "./pages/form-add/form-add.component";
import {ReservationsComponent} from "./pages/reservations/reservations.component";

const routes: Routes = [
  {path: '', redirectTo: '/homepage', pathMatch: 'full' },
  {path: 'homepage', component: AdminHomepageComponent},
  {path: 'carPark', component: CarParkComponent},
  {path: 'form-add', component: FormAddComponent},
  {path: 'homepage-customer', component: ReservationsComponent},
  {path: 'reservations', component: ReservationsComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
