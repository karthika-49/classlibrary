const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  title: { type: String, required: true },
  originalName: { type: String },
  subject: { type: String, required: true },
  userId : {type: String, required:true},
});
pdfSchema.methods.remove = async function () {
  await this.model('pdfs').deleteOne({ _id: this._id });
};
const PDF = mongoose.model('pdfs', pdfSchema);

module.exports = PDF;
