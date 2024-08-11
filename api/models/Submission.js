const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const SubmissionSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  }, // Auth0 user ID
  problem: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Problem', 
    required: true 
  },
  problemId: { 
    type: String, 
    required: true 
  }, // For easier querying
  code: { 
    type: String, 
    required: true 
  },
  language: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['PENDING', 'ACCEPTED', 'REJECTED'], 
    default: 'PENDING' 
  },
  results: [{
    passed: Boolean,
    isHidden: Boolean
  }]
}, { timestamps: true });

SubmissionSchema.plugin(AutoIncrement, { inc_field: 'submissionId' });
// // Creating compound indexes for faster queries
// SubmissionSchema.index({ user: 1, problem: 1 });
// SubmissionSchema.index({ problemId: 1, status: 1 });

module.exports = mongoose.model('Submission', SubmissionSchema);