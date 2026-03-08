import mongoose, { Schema, Document } from 'mongoose';

export interface IViva extends Document {
    subjectId: mongoose.Types.ObjectId;
    question: string;
    options: string[];
    correctAnswer: number; // index of correct option (0-3)
    explanation?: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
}

const VivaSchema: Schema = new Schema({
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
    explanation: { type: String },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
}, { timestamps: true });

export default mongoose.model<IViva>('Viva', VivaSchema);
