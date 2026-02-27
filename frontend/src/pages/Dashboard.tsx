import { useState, useEffect } from 'react';
import axios from 'axios';
import SubjectCard from '../components/SubjectCard';
import { Loader2, AlertCircle } from 'lucide-react';

interface Subject {
    _id: string;
    name: string;
    semester: number;
    courses: string[];
    description: string;
}

const Dashboard = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/subjects');
                setSubjects(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to load subjects. Ensure the backend is running.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500">Loading subjects...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full p-6 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                    <h3 className="text-red-800 font-semibold mb-1">Error</h3>
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Academic Dashboard</h1>
                    <p className="text-gray-500 mt-2">Explore subjects, practicals, and notes for your semesters.</p>
                </div>
            </div>

            {subjects.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-gray-400 mb-3">No subjects found</div>
                    <p className="text-gray-500 text-sm">Have you seeded the database yet?</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subjects.map((subject) => (
                        <SubjectCard
                            key={subject._id}
                            id={subject._id}
                            name={subject.name}
                            semester={subject.semester}
                            courses={subject.courses}
                            description={subject.description}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
