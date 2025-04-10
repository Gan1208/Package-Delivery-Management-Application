import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Driver } from '../models/driver';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent {
  aDriver: Driver = new Driver();

  constructor(private db: DatabaseService, private router: Router) {}

  addDriver() {
    this.db.createDriver(this.aDriver).subscribe({
      next: (data: any) => {

        this.router.navigate(['/list-drivers']);
      },
      error: (err) => {
        if (err.status === 400) {
          this.router.navigate(['invalid-data']);
        } else {
          console.error('Error occurred:', err);
        }
      }
    });
  }
}