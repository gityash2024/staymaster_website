import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class UnAuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        return this.condition(this.checkIfUserIsAuthenticated());
    }

    private condition(isAuthenticated: boolean): boolean {
        if (isAuthenticated) {
            this.router.navigate(['/dashboard'])
        }
        return !isAuthenticated;
    }

    /** Check PRA Auth token is available is not  */
    private checkIfUserIsAuthenticated(): boolean {
        // Check if the JWT token exists and is not expired
        const token = localStorage.getItem('PRAtoken');
        if (token) {
            // Here, you can use a JWT library (e.g., jwt-decode) to decode the token and check its expiration date
            // For simplicity, we assume that the token is valid if it exists.
            return true;
        }
        return false;
    }
}