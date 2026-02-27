import { BookText } from 'lucide-react';

interface NotesCardProps {
    unit: number;
    content: string;
}

const NotesCard = ({ unit, content }: NotesCardProps) => {
    return (
        <div className="card p-6 flex items-start gap-4">
            <div className="bg-gray-50 text-gray-400 p-3 rounded-xl border border-gray-100 flex-shrink-0">
                <BookText size={24} />
            </div>
            <div>
                <h4 className="font-semibold text-gray-900 mb-2">Unit {unit}</h4>
                <div className="prose prose-sm prose-gray max-w-none">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{content}</p>
                </div>
            </div>
        </div>
    );
};

export default NotesCard;
