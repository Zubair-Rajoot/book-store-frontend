import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthInterceptor } from '../app/interceptors/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { OrderComponent } from './order/order.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HighlightDirective } from './directives/highlight.directive';
import { BorrowDurationPipe } from './pipes/borrow-duration.pipe';
import { HomeComponent } from './main/home/home/home.component';
import { AdminComponent } from './main/home/admin/admin.component';
import { AuthModule } from './main/auth/auth.module';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
 
    OrderComponent,
    HighlightDirective,
    BorrowDurationPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,


    AuthModule,
    RouterModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 4000,
      progressBar: true,
      closeButton: true,
      preventDuplicates: true,
      enableHtml: true,
      tapToDismiss: false,
      newestOnTop: true,
      progressAnimation: 'decreasing'
    }),


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }