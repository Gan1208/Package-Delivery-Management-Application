import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { DatabaseService } from '../database.service';
import { UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [UpperCasePipe, FormsModule],
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.css']
})
export class DeleteDriverComponent {
  driverList: Driver[] = [];

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.db.getDriver().subscribe((data: any) => {
      this.driverList = data;
    });
  }

  deleteDriver(driverId: string) {
    this.db.deleteDriver(driverId).subscribe({
      next: (data: any) => {
        this.router.navigate(['/list-drivers']);
      },
      error: (err) => {
        if (err.status === 400) {
          // Redirect to 'invalid-data' if validation fails
          this.router.navigate(['invalid-data']);
        } else {
          console.error('Error occurred:', err);
        }
      }
    });
  }
}