import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module'; // Add this import
import { RouterModule } from '@angular/router';
import { HomeComponent } from './dasboard/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BookDialogComponent } from './book-dialog/book-dialog.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthInterceptor } from './auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { OrderComponent } from './order/order.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookDialogComponent,
    AdminComponent,
    HeaderComponent,
    OrderComponent,
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