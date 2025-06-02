import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { AuthGuard } from './guard/auth.guard';
import { OrderComponent } from './order/order.component';
import { HomeComponent } from './main/home/home/home.component';
import { AdminComponent } from './main/home/admin/admin.component';
import { LoginComponent } from './main/auth/login/login.component';
import { SignupComponent } from './main/auth/signup/signup.component';

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
