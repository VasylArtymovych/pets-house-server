// животные, которые привязываются к конкретному пользователю
const { model, Schema } = require('mongoose');

// const phoneRegexp=
// const petSex = ["Male", "Female"];
// const careView = ["lost", "found"];

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'DB: Name is required.'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'DB: Birthday is required.'],
    },
    breed: {
      type: String,
      required: [true, 'DB: Breed is required.'],
    },
    comments: {
      type: String,
      default: ''
    },
    // sex: {
    //   type: String,
    //   enum: petSex,        
    // },
    // inGoodHands: {
    //   type: Boolean,
    //   default: true,        
    // },
    // care: {
    //   type: String,
    //   enum: careView,         
    // }
    
    petImage: {            /// ????????????
        type: Image,
    },
    owner: {
      type: String,
      default: ''
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('pet', petSchema);
