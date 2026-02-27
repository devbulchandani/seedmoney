import { Link } from 'react-router-dom';
import { BookOpen, Layers } from 'lucide-react';

interface SubjectCardProps {
    id: string;
    name: string;
    semester: number;
    courses: string[];
    description: string;
}

const SubjectCard = ({ id, name, semester, courses, description }: SubjectCardProps) => {
    return (
        <Link to={`/subjects/${id}`} className="block h-full cursor-pointer">
            <div className="card p-6 flex flex-col h-full bg-white group">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <BookOpen size={24} />
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Semester {semester}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate" title={name}>
                    {name}
                </h3>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                    {description}
                </p>

                <div className="flex items-center gap-2 mt-auto">
                    <Layers size={16} className="text-gray-400" />
                    <div className="flex flex-wrap gap-1">
                        {courses.map((course, idx) => (
                            <span key={idx} className="text-xs text-gray-500 font-medium">
                                {course}{idx < courses.length - 1 ? ',' : ''}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SubjectCard;
