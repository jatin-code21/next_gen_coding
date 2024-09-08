const mongoose = require('mongoose');
const Autoincrement = require('mongoose-sequence')(mongoose)

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  isHidden: { type: Boolean, default: false }
});

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  inputFormat: { type: String, required: true },
  outputFormat: { type: String, required: true },
  constraints: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  testCases: [testCaseSchema],
  realWorldUse: {type: String, require: true}
}, {timestamps: true});

problemSchema.plugin(Autoincrement, {inc_field: 'problemId'});

problemSchema.index({ problemId: 1 });

module.exports = mongoose.model('Problem', problemSchema);
