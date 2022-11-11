// животные, которые привязываются к конкретному пользователю
const { model, Schema } = require('mongoose');


const NoticeSchema = new Schema(
  {
    // titleOfAdd: {
    //   type: String,
    //   required: [true, 'DB: Title of add is required.'],
    // },
    // name: {
    //   type: String,
    //   required: [true, 'DB: Name is required.'],
    // },
    // dateOfBirth: {
    //   type: String,
    //   required: [true, 'DB: Birthday is required.'],
    // },
    // breed: {
    //   type: String,
    //   required: [true, 'DB: Breed is required.'],
    // },
    // place: {
    //   type: String,
    //   required: [true, 'DB: Place is required.'],
    // },
    // age: {
    //   type: String,
    //   required: [true, 'DB: Age is required.'],
    // },
    // location: {
    //   type: String,
    //   required: [true, 'DB: Location is required.'],
    // },    
    // price: {
    //   type: String,
    //   required: [true, 'DB: Price is required.'],      
    // },
    // comments: {
    //   type: String,
    //   default: ''
    // },
    // sex: {
    //   type: String,
    //   enum: petSex,        
    // },
    // // sell: {
    // //   type: Boolean,   ???? or string
    // //   default: false,        
    // // },
    // inGoodHands: {
    //   type: Boolean,
    //   default: true,        
    // },
    // // care: {
    // //   type: String,
    // //   enum: careView,         
    // // }
    
    
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

module.exports = model('notice', NoticeSchema);
