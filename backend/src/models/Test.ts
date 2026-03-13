import mongoose, { Schema, Document } from 'mongoose';

export interface ITest extends Document {
    subjectId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    duration: number; // in minutes
    totalQuestions: number;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
    questions: mongoose.Types.ObjectId[]; // References to Question model
}

const TestSchema: Schema = new Schema({
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard', 'Mixed'], required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
}, { timestamps: true });

// Index for better query performance
TestSchema.index({ subjectId: 1 });
TestSchema.index({ difficulty: 1 });

export default mongoose.model<ITest>('Test', TestSchema);
