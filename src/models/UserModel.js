const { model, Schema } = require('mongoose');

// const phoneRegexp=

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      required: [true, 'DB: Email is required.'],
    },
    password: {
      type: String,
      required: [true, 'DB: Password is required.'],
    },
    city: {
      type: String,
      required: [true, 'DB: City is required.'],      
    },
    phone: {
      type: String,
      required: [true, 'DB: Phone is required.'],
      match: phoneRegexp,
    },
    // birthday: {

    // },
    token: {
      type: String,
      default: null
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('user', userSchema);
