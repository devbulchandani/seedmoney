import { Link } from 'react-router-dom';
import { Clock, FileQuestion, BookOpen } from 'lucide-react';
import clsx from 'clsx';

interface TestCardProps {
    test: {
        _id: string;
        title: string;
        description: string;
        duration: number;
        totalQuestions: number;
        difficulty: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
        subjectId: {
            _id: string;
            name: string;
            semester: number;
            courses: string[];
        };
    };
}

const TestCard = ({ test }: TestCardProps) => {
    const difficultyColors = {
        Easy: 'bg-green-100 text-green-700 border-green-200',
        Medium: 'bg-amber-100 text-amber-700 border-amber-200',
        Hard: 'bg-red-100 text-red-700 border-red-200',
        Mixed: 'bg-blue-100 text-blue-700 border-blue-200',
    };

    return (
        <Link
            to={`/test/${test._id}`}
            className="block bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-400 transition-all duration-300 group h-full flex flex-col"
        >
            <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition-colors">
                    <FileQuestion className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {test.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <BookOpen className="w-4 h-4" />
                        <span className="truncate">{test.subjectId.name}</span>
                    </div>
                </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                {test.description}
            </p>

            <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <Clock size={14} className="mr-1.5 text-blue-600" />
                    {test.duration} min
                </div>
                <div className="flex items-center text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <FileQuestion size={14} className="mr-1.5 text-blue-600" />
                    {test.totalQuestions} Qs
                </div>
                <span className={clsx(
                    'px-3 py-1.5 text-xs font-bold rounded-lg border',
                    difficultyColors[test.difficulty]
                )}>
                    {test.difficulty}
                </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Semester {test.subjectId.semester}</span>
                <span>•</span>
                <span>{test.subjectId.courses.join(', ')}</span>
            </div>
        </Link>
    );
};

export default TestCard;
