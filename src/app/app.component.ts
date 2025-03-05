import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    isSidebarOpen: boolean = true; // Sidebar starts open by default

    constructor(private authService: AuthService) { }

    isAuthenticated(): boolean {
        return this.authService.isLoggedIn();
    }

    onSidebarToggle(isOpen: any) {
        this.isSidebarOpen = isOpen;
    }
}