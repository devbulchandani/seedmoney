import { Link } from 'react-router-dom';
import { Building2, Tag, Code2, FileQuestion } from 'lucide-react';
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
        Easy: 'bg-green-100 text-green-700 border-green-200',
        Medium: 'bg-amber-100 text-amber-700 border-amber-200',
        Hard: 'bg-red-100 text-red-700 border-red-200',
    };

    const linkPath = type === 'mcq' 
        ? `/mcq/${id}?type=pyq&subjectId=${subjectId}` 
        : `/pyq-code/${id}?subjectId=${subjectId}`;

    return (
        <Link
            to={linkPath}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-400 transition-all group"
        >
            <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition-colors">
                    {type === 'code' ? (
                        <Code2 className="w-5 h-5 text-white" />
                    ) : (
                        <FileQuestion className="w-5 h-5 text-white" />
                    )}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-blue-600" />
                            <h3 className="text-lg font-bold text-gray-900">{company}</h3>
                        </div>
                        <span className={clsx(
                            'px-3 py-1 text-xs font-bold rounded-full border',
                            difficultyColors[difficulty]
                        )}>
                            {difficulty}
                        </span>
                        <span className="px-3 py-1 text-xs font-bold rounded-full border bg-blue-100 text-blue-700 border-blue-200">
                            {type === 'code' ? 'Coding' : 'MCQ'}
                        </span>
                    </div>
                    <p className="text-gray-800 leading-relaxed mb-4 text-base line-clamp-2 group-hover:text-gray-900">
                        {question}
                    </p>
                    {tags.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                            <Tag className="w-4 h-4 text-gray-400" />
                            {tags.slice(0, 3).map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
                                >
                                    {tag}
                                </span>
                            ))}
                            {tags.length > 3 && (
                                <span className="text-xs text-gray-500 font-medium">
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
