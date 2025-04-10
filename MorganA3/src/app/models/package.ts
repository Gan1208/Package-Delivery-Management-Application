export class Package {
    _id: string;
    packageId: string;
    packageTitle: string;
    packageWeight: number;
    packageDestination: string;
    packageDescription: string;
    isAllocated: boolean;
    packageDriverId: string;

    constructor() {
        this._id = '';
        this.packageId = '';
        this.packageTitle = '';
        this.packageWeight = 0;
        this.packageDestination = '';
        this.packageDescription = '';
        this.isAllocated = true;
        this.packageDriverId = '';
    }

}
