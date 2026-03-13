import { Link } from 'react-router-dom';
import { Building2, Tag, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface PYQCardProps {
    id: string;
    subjectId: string;
    company: string;
    question: string;
    type: 'mcq' | 'code';
    difficulty: 'Easy' | 'Medium' | 'Hard';
    tags: string[];
}

const PYQCard = ({ id, subjectId, company, question, type, difficulty, tags }: PYQCardProps) => {
    const difficultyColors = {
        Easy: 'text-green-600 bg-green-50',
        Medium: 'text-yellow-600 bg-yellow-50',
        Hard: 'text-red-600 bg-red-50',
    };

    const linkPath = type === 'mcq' 
        ? `/mcq/${id}?type=pyq&subjectId=${subjectId}` 
        : `/pyq-code/${id}?subjectId=${subjectId}`;

    return (
        <Link
            to={linkPath}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border border-gray-200 rounded-sm shadow-sm p-4 hover:bg-gray-50 transition-colors group"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <div className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-gray-600" />
                            <span className="font-semibold text-gray-900 text-sm">{company}</span>
                        </div>
                        <span className={clsx(
                            'px-2 py-0.5 text-xs font-medium rounded',
                            difficultyColors[difficulty]
                        )}>
                            {difficulty}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-medium rounded bg-blue-50 text-blue-600">
                            {type === 'code' ? 'Coding' : 'MCQ'}
                        </span>
                    </div>
                    <p className="text-[#2874A6] group-hover:underline line-clamp-2 mb-2 flex items-center gap-1">
                        {question}
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </p>
                    {tags.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                            <Tag className="w-3 h-3 text-gray-400" />
                            {tags.slice(0, 3).map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                            {tags.length > 3 && (
                                <span className="text-xs text-gray-500">
                                    +{tags.length - 3} more
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default PYQCard;
