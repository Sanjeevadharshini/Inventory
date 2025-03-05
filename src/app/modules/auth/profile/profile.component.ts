import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;
    user: any = null;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.profileForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: [''] // Optional password update
        });
    }

    ngOnInit() {
        this.authService.getProfile().subscribe({
            next: (user) => {
                this.user = user;
                this.profileForm.patchValue({
                    name: user.name,
                    email: user.email
                });
            },
            error: (err) => Swal.fire('Error', err.error.message, 'error')
        });
    }

    onSubmit() {
        if (this.profileForm.invalid) {
            Swal.fire('Error', 'Please fill out all required fields correctly.', 'error');
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to update your profile?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const formData = this.profileForm.value;
                if (!formData.password) delete formData.password; // Remove password if not updated
                this.authService.updateProfile(formData).subscribe({
                    next: () => {
                        Swal.fire('Success', 'Profile updated successfully.', 'success');
                        this.ngOnInit(); // Refresh profile data
                    },
                    error: (err) => Swal.fire('Error', err.error.message, 'error')
                });
            }
        });
    }
}