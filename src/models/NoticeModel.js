const { model, Schema } = require('mongoose');

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
    sex: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'DB: Sex is required.']
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
    category: {
      type: String,
      enum: ['lost', 'found', 'in good hands', 'sell']
    },
    owner: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('notice', NoticeSchema);
