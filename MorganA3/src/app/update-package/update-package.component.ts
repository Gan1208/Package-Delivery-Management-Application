import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Package } from '../models/package';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-package.component.html',
  styleUrls: ['./update-package.component.css']
})
export class UpdatePackageComponent {
  aPackage: Package = new Package();

  constructor(private db: DatabaseService, private router: Router) {}

  updatePackageInfo() {
    this.db.updatePackage(this.aPackage).subscribe({
      next: (data: any) => {
        this.router.navigate(['/list-packages']);
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