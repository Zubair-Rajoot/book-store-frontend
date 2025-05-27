import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './dasboard/home/home.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
 { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
   { path: 'home', component: HomeComponent },

  { path: 'admin', component: HomeComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
