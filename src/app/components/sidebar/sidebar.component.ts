import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isOpen: boolean = true;
    @Output() toggleSidebarEvent = new EventEmitter<boolean>();
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    toggleSidebar() {
        this.isOpen = !this.isOpen;
        this.toggleSidebarEvent.emit(this.isOpen);
    }

    logout() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Want to Logout!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.authService.logout();
                Swal.fire('Logged Out', 'You have been logged out successfully.', 'success');
                this.router.navigate(['/auth/login']);
            }
        });
        // this.authService.logout();
        // Swal.fire('Logged Out', 'You have been logged out successfully.', 'success');
        // this.router.navigate(['/auth/login']);
    }

    getUserRole(): string | null {
        return this.authService.getUserRole();
    }
}