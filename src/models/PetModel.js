const { model, Schema } = require('mongoose');

// const phoneRegexp=
const petSex = ["Male", "Female"];
// const careView = ["lost", "found"];

const petSchema = new Schema(
  {
    titleOfAdd: {
      type: String,
      required: [true, 'DB: Title of add is required.'],
    },
    petName: {
      type: String,
      required: [true, 'DB: Name is required.'],
    },
    birthday: {
      type: String,
      required: [true, 'DB: Birthday is required.'],
    },
    breed: {
      type: String,
      required: [true, 'DB: Breed is required.'],
    },
    place: {
      type: String,
      required: [true, 'DB: Place is required.'],
    },
    age: {
      type: String,
      required: [true, 'DB: Age is required.'],
    },
    location: {
      type: String,
      required: [true, 'DB: Location is required.'],
    },    
    price: {
      type: String,
      required: [true, 'DB: Price is required.'],      
    },
    comments: {
      type: String,
      default: ''
    },
    sex: {
      type: String,
      enum: petSex,        
    },
    // sell: {
    //   type: Boolean,   ???? or string
    //   default: false,        
    // },
    inGoodHands: {
      type: Boolean,
      default: true,        
    },
    // care: {
    //   type: String,
    //   enum: careView,         
    // }
    
    // petImage: {            ????????????
    //     type: Image,
    // }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('pet', petSchema);
