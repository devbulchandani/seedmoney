import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface VivaCardProps {
    id: string;
    subjectId: string;
    question: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
}

const VivaCard = ({ id, subjectId, question, difficulty }: VivaCardProps) => {
    const difficultyColors = {
        Easy: 'text-green-600 bg-green-50',
        Medium: 'text-yellow-600 bg-yellow-50',
        Hard: 'text-red-600 bg-red-50',
    };

    return (
        <Link
            to={`/mcq/${id}?type=viva&subjectId=${subjectId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border border-gray-200 rounded-sm shadow-sm p-4 hover:bg-gray-50 transition-colors group"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={clsx(
                            'px-2 py-0.5 text-xs font-medium rounded',
                            difficultyColors[difficulty]
                        )}>
                            {difficulty}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-medium rounded bg-blue-50 text-blue-600">
                            MCQ
                        </span>
                    </div>
                    <p className="text-[#2874A6] group-hover:underline line-clamp-2 flex items-center gap-1">
                        {question}
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default VivaCard;
