import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.getAuthStatus().subscribe((data: any) => {
      if (data.isAuthenticated) {
        console.log(data.isAuthenticated);
        this.auth.userlogIn();
        this.router.navigate([""]);
      }
    });
  }

  googleLogin() {
    window.location.href = 'http://localhost:8080/auth/google';
  }
}
//Reference: https://stackoverflow.com/questions/7077770/window-location-href-and-window-open-methods-in-javascript