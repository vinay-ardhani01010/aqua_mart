const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    default:"Not Resolved",
    enum:["Not Resolved,Resolving,Resolved"]
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  vendor:{
    type: ObjectId,
    ref:"VendorSchema"
  }
});

const messages = mongoose.model('MessageSchema',MessageSchema);

module.exports = messages;