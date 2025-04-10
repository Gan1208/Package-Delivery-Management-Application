const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({

    packageId: {
        type: String,
        default: ()=>{
            const startsWith = "P";
            const randomDigit = () => Math.floor(Math.random() * 10).toString();
            const hyphenate = "-";
            const myInitials = "KP";
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const randomUppercaseLetter = ()=> alphabet.charAt(Math.floor(Math.random() * alphabet.length)); 
            return startsWith + randomUppercaseLetter() + randomUppercaseLetter()
            + hyphenate + myInitials + hyphenate + randomDigit() + randomDigit() +randomDigit();
        }
    },
    packageTitle: {
        type: String,
        required: true,
        validate: {
            validator: function (title) {
                return title.length >= 3 && title.length <= 15 && /^[A-Za-z0-9 ]+$/.test(title);
            }, message: 'Title must has 3-15 letters'
        }
    },
    packageWeight: {
        type: Number,
        required: true,
        validate: {
            validator: function (weight) {
                return weight>0;
            }, message: 'Weight must be larger than 0'
        }
    },
    packageDestination: {
        type: String,
        required: true,
        validate: {
            validator: function (destination) {
                return destination.length >= 5 && destination.length <= 15 && /^[A-Za-z0-9 ]+$/.test(destination);
            }, message: 'Destination must has 5-15 letters'
        }
    },

    packageDescription: {
        type: String,
        validate: {
            validator: function (description) {
                return description.length >= 0 && description.length <= 30;
            }, message: 'Description must has 0-30 letters'
        }
    },
    isAllocated: {
        type: Boolean,
        required: true
    },
    packageDriverId: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Package', packageSchema); 