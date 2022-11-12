// животные, которые привязываются к конкретному пользователю
const { model, Schema } = require('mongoose');

// const phoneRegexp=
// const petSex = ["Male", "Female"];
// const careView = ["lost", "found"];

const petSchema = new Schema(
  {
    name: {
      type: String,
      default: ''
      // required: [true, 'DB: Name is required.']
    },
    dateOfBirth: {
      type: String,
      default: ''
      // required: [true, 'DB: Date of birth is required.']
    },
    breed: {
      type: String,
      default: ''
      // required: [true, 'DB: Breed is required.']
    },
    comments: {
      type: String,
      default: ''
      // required: [true, 'DB: Comments is required.']
    },
    petImage: {            
      type: String,
      default: ''
      // required: [true, 'DB: Pet image is required.']
    },
    owner: {
      type: String,
      default: ''
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('pet', petSchema);
