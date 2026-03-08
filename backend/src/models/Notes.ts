import mongoose, { Schema, Document } from 'mongoose';

export interface INotes extends Document {
    subjectId: mongoose.Types.ObjectId;
    title: string;
    driveUrl: string;
    unit?: number;
}

const NotesSchema: Schema = new Schema({
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    title: { type: String, required: true },
    driveUrl: { type: String, required: true },
    unit: { type: Number },
}, { timestamps: true });

export default mongoose.model<INotes>('Notes', NotesSchema);
