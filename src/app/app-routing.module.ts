import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './dasboard/home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
 { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
   { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, 
   
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }, 
   { path: 'order/:id', component: OrderComponent }, 


  // { path: 'admin', component: HomeComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
