import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const API_URL = '/api/v1';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

const URL_BACKEND = "http://localhost:8080";// or  http://36.125.10.3:8081

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor(private http: HttpClient) { }

  createDriver(aDriver: any) {
    return this.http.post(API_URL + '/drivers', aDriver, httpOptions);
  }
  getDriver() {
    return this.http.get(API_URL + '/drivers');
  }
  deleteDriver(deleteDriverById:string){
    return this.http.delete(API_URL + '/drivers/'+ deleteDriverById);
  }
  updateDriver(aDriverInfo: any) {
    return this.http.put(API_URL + '/drivers',aDriverInfo, httpOptions);
  }

  createPacakge(aPackage: any) {
    return this.http.post(API_URL + '/packages', aPackage, httpOptions);
  }
  getPacakge() {
    return this.http.get(API_URL + '/packages');
  }
  deletePacakge(deletePackageById:string){
    return this.http.delete(API_URL + '/packages/'+deletePackageById);
  }
  updatePackage(aPackageInfo: any) {
    return this.http.put(API_URL + '/packages',aPackageInfo, httpOptions);
  }

  getStats() {
    return this.http.get(API_URL + '/stats');
  }

  getDriverPackages(_id: string) {
    return this.http.get(API_URL + '/drivers/packages/'+ _id);
  }

  getPackageDriver(packageDriverId: string) {
    return this.http.get(API_URL + '/packages/driver/'+ packageDriverId);
  }


}
