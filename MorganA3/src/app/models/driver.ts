export class Driver {
    _id: string;
    driverId: string;
    driverName: string;
    driverDepartment: string;
    driverLicence: string;
    driverIsActive: boolean;
    driverCreatedAt: string;
    assignedPackages: string[];

    constructor() {
        this._id = '';
        this.driverId = '';
        this.driverName = '';
        this.driverDepartment = '';
        this.driverLicence = '';
        this.driverIsActive = true;
        this.driverCreatedAt = '';
        this.assignedPackages = [];
    }


}