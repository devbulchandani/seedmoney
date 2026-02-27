import mongoose, { Schema, Document } from 'mongoose';

export interface ISubject extends Document {
    name: string;
    semester: number;
    courses: string[];
    description: string;
}

const SubjectSchema: Schema = new Schema({
    name: { type: String, required: true },
    semester: { type: Number, required: true },
    courses: { type: [String], required: true },
    description: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<ISubject>('Subject', SubjectSchema);
