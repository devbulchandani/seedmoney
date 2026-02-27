import mongoose, { Schema, Document } from 'mongoose';

export interface IPractical extends Document {
    subjectId: mongoose.Types.ObjectId;
    title: string;
    problemStatement: string;
    solution: string;
}

const PracticalSchema: Schema = new Schema({
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    title: { type: String, required: true },
    problemStatement: { type: String, required: true },
    solution: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IPractical>('Practical', PracticalSchema);
