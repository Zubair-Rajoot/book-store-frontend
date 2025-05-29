import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  bookId: any;
  orderForm: FormGroup;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.orderForm = this.fb.group({
      borrowFrom: ['', Validators.required],
      borrowTo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id')!;
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.loading = true;
      const { borrowFrom, borrowTo } = this.orderForm.value;
      
      this.todoService.createOrder(this.bookId, borrowFrom, borrowTo).subscribe({
        next: (res) => {
          this.loading = false;
          this.toastr.success('book borrow successfully!', 'Success');
          this.router.navigate(['/home']); 
        },
        error: (err) => {
          this.loading = false;
          
        }
        
      });
    }
  }
}