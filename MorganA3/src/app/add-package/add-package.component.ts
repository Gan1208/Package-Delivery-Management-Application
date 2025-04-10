import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Package } from '../models/package';
import { Driver } from '../models/driver';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})
export class AddPackageComponent {
  aPackage: Package = new Package();
  driverList: Driver[] = [];

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.db.getDriver().subscribe((data: any) => {
      this.driverList = data;
    });
  }

  addPackage() {
    this.db.createPacakge(this.aPackage).subscribe({
      next: (data: any) => {
        this.router.navigate(['/list-packages']);
      },
      error: (err) => {
        if (err.status === 400 ) {
          this.router.navigate(['invalid-data']);
        } else {
          console.error('Error occurred:', err);
        }
      }
    });
  }
}