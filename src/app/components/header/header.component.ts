import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    user: any = null;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.authService.getProfile().subscribe({
                next: (user) => this.user = user,
                error: (err) => console.error(err)
            });
        }
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }
}