const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, minlength: 4 },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Invalid email address"]
    },
    address: {
        street: { type: String, required: true },
        suite: { type: String, required: true },
        city: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return /^[A-Za-z\s]+$/.test(value);
                },
                message: "City name can only contain alphabets and spaces"
            }
        },
        zipcode: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return /^\d{5}-\d{4}$/.test(value);
                },
                message: "Invalid Zip Code format (Expected: DDDDD-DDDD)"
            }
        },
        geo: {
            lat: { type: String, required: true },
            lng: { type: String, required: true }
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^1-\d{3}-\d{3}-\d{4}$/.test(value);
            },
            message: "Phone format must be 1-123-123-1234"
        }
    },
    website: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return validator.isURL(value, { protocols: ['http', 'https'] });
            },
            message: "Invalid website URL (must start with http or https)"
        }
    },
    company: {
        name: { type: String, required: true },
        catchPhrase: { type: String, required: true },
        bs: { type: String, required: true }
    }
});

module.exports = mongoose.model('User', userSchema);
