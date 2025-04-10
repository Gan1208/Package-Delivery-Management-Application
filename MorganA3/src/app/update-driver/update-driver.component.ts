import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Driver } from '../models/driver';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-driver.component.html',
  styleUrls: ['./update-driver.component.css']
})
export class UpdateDriverComponent {
  aDriver: Driver = new Driver();

  constructor(private db: DatabaseService, private router: Router) {}

  updateDriverInfo() {
    this.db.updateDriver(this.aDriver).subscribe({
      next: (data: any) => {
        this.router.navigate(['/list-drivers']);
      },
      error: (err) => {
        if (err.status === 400 || err.status === 500) {
          // Redirect to 'invalid-data' if validation fails
          this.router.navigate(['invalid-data']);
        } else {
          console.error('Error occurred:', err);
        }
      }
    });
  }
}