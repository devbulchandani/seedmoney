import mongoose, { Schema, Document } from 'mongoose';

export interface INotes extends Document {
    subjectId: mongoose.Types.ObjectId;
    unit: number;
    content: string;
}

const NotesSchema: Schema = new Schema({
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    unit: { type: Number, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<INotes>('Notes', NotesSchema);
