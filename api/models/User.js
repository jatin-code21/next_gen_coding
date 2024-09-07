const mongoose = require('mongoose');

const dailyQuestionSchema = new mongoose.Schema({
  problemId: { type: String, required: true },
  count: { type: Number, default: 0 },
  lastReset: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  sub: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  webhookUrl: { type: String },
  dailyQuestions: [dailyQuestionSchema]
}, { timestamps: true });

UserSchema.methods.getQuestionsLeft = function (problemId) {
  const now = new Date();
  let questionRecord = this.dailyQuestions.find(q => q.problemId === problemId);

  if (!questionRecord) {
    questionRecord = { problemId, count: 0, lastReset: now };
    this.dailyQuestions.push(questionRecord);
  } else if (now.getDate() !== questionRecord.lastReset.getDate()) {
    questionRecord.count = 0;
    questionRecord.lastReset = now;
  }

  return 5 - questionRecord.count;
};

UserSchema.methods.incrementQuestionCount = function (problemId) {
  const questionRecord = this.dailyQuestions.find(q => q.problemId === problemId);
  if (questionRecord) {
    questionRecord.count += 1;
  }
};

module.exports = mongoose.model('User', UserSchema);