import { Link } from 'react-router-dom';
import { BookOpen, Clock, GraduationCap } from 'lucide-react';

interface SubjectCardProps {
    id: string;
    name: string;
    semester: number;
    courses: string[];
    description: string;
}

const SubjectCard = ({ id, name, semester, courses, description }: SubjectCardProps) => {
    return (
        <Link
            to={`/subjects/${id}`}
            className="block bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-400 transition-all duration-300 group"
        >
            <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition-colors">
                    <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {name}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <Clock size={14} className="mr-1.5 text-blue-600" />
                    Sem {semester}
                </div>
                <div className="flex items-center text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <GraduationCap size={14} className="mr-1.5 text-blue-600" />
                    {courses.length} {courses.length === 1 ? 'Course' : 'Courses'}
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {courses.map((course, idx) => (
                    <span
                        key={idx}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200"
                    >
                        {course}
                    </span>
                ))}
            </div>
        </Link>
    );
};

export default SubjectCard;
