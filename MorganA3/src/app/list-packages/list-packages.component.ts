import { Component } from '@angular/core';
import { Package } from '../models/package';
import { DatabaseService } from '../database.service';
import { WeightPipe } from '../weight.pipe';
import { Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { Driver } from '../models/driver';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [WeightPipe, UpperCasePipe, FormsModule],
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.css']
})
export class ListPackagesComponent {
  showDriver: boolean = false;
  driver: Driver = new Driver();
  packageList: Package[] = [];

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.db.getPacakge().subscribe((data: any) => {
      this.packageList = data;
    });
  }

  getPackageDriver(packageDriverId: string) {
    this.db.getPackageDriver(packageDriverId).subscribe((data: any) => {
      this.driver = data;
      this.showDriver = true;
    });
  }
}