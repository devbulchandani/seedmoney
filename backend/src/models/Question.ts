import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
    subjectId: mongoose.Types.ObjectId;
    question: string;
    options: string[];
    correctAnswer: number; // index of correct option (0-3)
    explanation?: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    tags: string[];
    companies: string[]; // Companies where this question was asked in interviews
    category?: string; // e.g., "Data Structures", "Algorithms", "DBMS", etc.
}

const QuestionSchema: Schema = new Schema({
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true, validate: [arrayLimit, '{PATH} must have exactly 4 options'] },
    correctAnswer: { type: Number, required: true, min: 0, max: 3 },
    explanation: { type: String },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    tags: { type: [String], default: [] },
    companies: { type: [String], default: [] }, // Array of company names
    category: { type: String },
}, { timestamps: true });

function arrayLimit(val: string[]) {
    return val.length === 4;
}

// Index for better query performance
QuestionSchema.index({ subjectId: 1, difficulty: 1 });
QuestionSchema.index({ companies: 1 });
QuestionSchema.index({ tags: 1 });

export default mongoose.model<IQuestion>('Question', QuestionSchema);
