// животные, которые привязываются к конкретному пользователю
const { model, Schema } = require('mongoose');

// const phoneRegexp=
// const petSex = ["Male", "Female"];
// const careView = ["lost", "found"];

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'DB: Name is required.']
    },
    dateOfBirth: {
      type: String,
      required: [true, 'DB: Date of birth is required.']
    },
    breed: {
      type: String,
      required: [true, 'DB: Breed is required.']
    },
    comments: {
      type: String,
      required: [true, 'DB: Comments is required.']
    },
    petImage: {            
      type: String,
      default: ''
      // required: [true, 'DB: Pet image is required.']
    },
    owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,     
  }  
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('pet', petSchema);
