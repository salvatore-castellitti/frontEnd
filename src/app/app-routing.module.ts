import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";
import {AdminHomepageComponent} from "./pages/admin-homepage/admin-homepage.component";
import {CarParkComponent} from "./pages/car-park/car-park.component";
import {ReservationsPageComponent} from "./pages/reservations-page/reservations-page.component";
import {CustomFormComponent} from "./custom-component/custom-form/custom-form.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'heroes', component: HeroesComponent },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent },
  {path: 'homepage', component: AdminHomepageComponent},
  {path: 'carPark', component: CarParkComponent},
  {path: 'reservation', component: ReservationsPageComponent},
  {path: 'form', component: CustomFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
