// животные, которые привязываются к конкретному пользователю
const { model, Schema } = require('mongoose');

const petSex = ['Male', 'Female'];
const careView = ['Lost', 'Found'];

const NoticeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'DB: Title of add is required.']
    },
    name: {
      type: String
    },
    dateOfBirth: {
      type: String
    },
    breed: {
      type: String
    },
    location: {
      type: String,
      required: [true, 'DB: Location is required.']
    },
    price: {
      type: String,
      required: [true, 'DB: Price is required.']
    },
    comments: {
      type: String
    },
    sex: {
      type: String,
      enum: petSex
    },
    sell: {
      type: Boolean,
      default: false
    },
    inGoodHands: {
      type: Boolean,
      default: true
    },
    care: {
      type: String,
      enum: careView
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

module.exports = model('notice', NoticeSchema);
