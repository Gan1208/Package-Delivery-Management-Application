import { Component } from '@angular/core';
import { Package } from '../models/package';
import { DatabaseService } from '../database.service';
import { WeightPipe } from '../weight.pipe';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [WeightPipe, FormsModule],
  templateUrl: './delete-package.component.html',
  styleUrls: ['./delete-package.component.css']
})
export class DeletePackageComponent {
  packageList: Package[] = [];

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.db.getPacakge().subscribe((data: any) => {
      this.packageList = data;
    });
  }

  deletePackage(packageId: string) {
    this.db.deletePacakge(packageId).subscribe({
      next: (data: any) => {
        this.router.navigate(['/list-packages']);
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

  deleteDriver(driverId: string) {
    this.db.deleteDriver(driverId).subscribe({
      next: (data: any) => {
        console.log(driverId);
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