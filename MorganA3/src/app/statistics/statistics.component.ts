import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Driver } from '../models/driver';
import { Package } from '../models/package';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {

  driverList: Driver[]=[];
  packageList: Package[]=[];
  numberOfDriver: number = 0;
  numberOfPackage: number = 0;


  numberOfInsert: number = 0;
  numberOfGet: number = 0;
  numberOfUpdate: number = 0;
  numberOfDelete: number = 0;

  constructor(private db:DatabaseService) {}

  ngOnInit(){
    this.db.getStats().subscribe((data:any)=>{
      this.numberOfInsert = data.numberOfInsert;
      this.numberOfGet = data.numberOfGet;
      this.numberOfUpdate = data.numberOfUpdate;
      this.numberOfDelete= data.numberOfDelete;
    });

    this.db.getDriver().subscribe((data:any)=>{
      this.driverList=data;
      this.numberOfDriver = data.length
    });

    this.db.getPacakge().subscribe((data:any)=>{
      this.packageList=data;
      this.numberOfPackage = data.length;
    });
  }

}
