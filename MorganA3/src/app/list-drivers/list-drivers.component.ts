import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { DatabaseService } from '../database.service';
import { UpperCasePipe } from '@angular/common';
import { Package } from '../models/package';
import { WeightPipe } from '../weight.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [UpperCasePipe, WeightPipe, FormsModule],
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.css']
})
export class ListDriversComponent {
  showPackage: boolean = false;
  packageList: Package[] = [];
  driverList: Driver[] = [];

  constructor(private db: DatabaseService) {}

  ngOnInit() {
    this.db.getDriver().subscribe((data: any) => {
      this.driverList = data;
    });
  }

  getDriverPackage(driverId: string) {
    this.db.getDriverPackages(driverId).subscribe((data: any) => {
      this.packageList = data;
      this.showPackage = true;
    });

  }
}