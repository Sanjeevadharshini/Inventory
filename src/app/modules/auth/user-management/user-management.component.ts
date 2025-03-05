import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  editingUserId: string | null = null;
  editForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe({
      next: (users) => this.users = users,
      error: (err) => Swal.fire('Error', err.error.message, 'error')
    });
  }

  startEdit(user: any) {
    this.editingUserId = user._id;
    console.log(user);
    
    this.editForm.patchValue({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
  }

  cancelEdit() {
    this.editingUserId = null;
    this.editForm.reset();
  }

  saveEdit(userId: string) {
    if (this.editForm.invalid) {
      Swal.fire('Error', 'Please fill out all required fields correctly.', 'error');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save changes to this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.updateUser(userId, this.editForm.value).subscribe({
          next: () => {
            Swal.fire('Success', 'User updated successfully.', 'success');
            this.editingUserId = null;
            this.loadUsers();
          },
          error: (err) => Swal.fire('Error', err.error.message, 'error')
        });
      }
    });
  }

  deleteUser(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUser(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            this.loadUsers();
          },
          error: (err) => Swal.fire('Error', err.error.message, 'error')
        });
      }
    });
  }
}