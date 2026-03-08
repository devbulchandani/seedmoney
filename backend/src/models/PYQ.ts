import mongoose, { Schema, Document } from 'mongoose';

export interface IPYQ extends Document {
    subjectId: mongoose.Types.ObjectId;
    company: string;
    question: string;
    type: 'mcq' | 'code';
    difficulty: 'Easy' | 'Medium' | 'Hard';
    tags: string[];
    // MCQ specific fields
    options?: string[];
    correctAnswer?: number; // index of correct option (0-3)
    explanation?: string;
}

const PYQSchema: Schema = new Schema({
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    company: { type: String, required: true },
    question: { type: String, required: true },
    type: { type: String, enum: ['mcq', 'code'], required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    tags: { type: [String], default: [] },
    options: { type: [String] },
    correctAnswer: { type: Number },
    explanation: { type: String },
}, { timestamps: true });

export default mongoose.model<IPYQ>('PYQ', PYQSchema);
