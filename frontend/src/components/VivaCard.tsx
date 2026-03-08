import { Link } from 'react-router-dom';
import { MessageCircleQuestion } from 'lucide-react';
import clsx from 'clsx';

interface VivaCardProps {
    id: string;
    question: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
}

const VivaCard = ({ id, question, difficulty }: VivaCardProps) => {
    const difficultyColors = {
        Easy: 'bg-green-100 text-green-700 border-green-200',
        Medium: 'bg-amber-100 text-amber-700 border-amber-200',
        Hard: 'bg-red-100 text-red-700 border-red-200',
    };

    return (
        <Link
            to={`/mcq/${id}?type=viva`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-300 transition-all group"
        >
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MessageCircleQuestion className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <span className={clsx(
                            'px-3 py-1 text-xs font-bold rounded-full border',
                            difficultyColors[difficulty]
                        )}>
                            {difficulty}
                        </span>
                        <span className="px-3 py-1 text-xs font-bold rounded-full border bg-indigo-100 text-indigo-700 border-indigo-200">
                            MCQ
                        </span>
                    </div>
                    <p className="text-gray-800 leading-relaxed text-base group-hover:text-gray-900 line-clamp-2">
                        {question}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default VivaCard;
