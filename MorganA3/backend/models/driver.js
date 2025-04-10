const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
    driverId: {
        type: String,
        default: ()=>{
            const startsWith = "D";
            const randomDigit = () => Math.floor(Math.random() * 10).toString();
            const hyphenate = "-";
            const studentId = 32;
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const randomUppercaseLetter = ()=> alphabet.charAt(Math.floor(Math.random() * alphabet.length)); 
            return startsWith + randomDigit() + randomDigit()
            + hyphenate + studentId + hyphenate +randomUppercaseLetter() + randomUppercaseLetter() + randomUppercaseLetter();
        }
    },
    
    driverName: {
        type: String,
        required: true,
        validate: {
            validator: function (name) {
                return name.length >= 3 && name.length <= 20 && /^[A-Za-z]+$/.test(name);

            }, message: 'Name must has 3-20 letters'
        }
    },

    driverDepartment: {
        type: String,
        required: true
    },

    driverLicence: {
        type: String,
        required: true,
        validate: {
            validator: function (licence) {
                return licence.length === 5 && /^[A-Za-z0-9]+$/.test(licence);
            }, message: 'Licence must has 5 letters'
        }
    },

    driverIsActive: {
        type: Boolean,
        required: true
    },

    driverCreatedAt: {
        type: String,
        default: new Date().toLocaleString()
    },

    assignedPackages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    }]
});

module.exports = mongoose.model('Driver', driverSchema);  


