import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Loader2, BookOpen, Clock } from 'lucide-react';
import PracticalCard from '../components/PracticalCard';
import NotesCard from '../components/NotesCard';
import clsx from 'clsx';

interface SubjectDetailsData {
    _id: string;
    name: string;
    semester: number;
    courses: string[];
    description: string;
}

interface Practical {
    _id: string;
    title: string;
    problemStatement: string;
    solution: string;
}

interface Note {
    _id: string;
    unit: number;
    content: string;
}

const SubjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [subject, setSubject] = useState<SubjectDetailsData | null>(null);
    const [practicals, setPracticals] = useState<Practical[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'practicals' | 'notes'>('practicals');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubjectData = async () => {
            try {
                setLoading(true);
                const [subjectRes, practicalsRes, notesRes] = await Promise.all([
                    axios.get(`http://localhost:5001/api/subjects/${id}`),
                    axios.get(`http://localhost:5001/api/subjects/${id}/practicals`),
                    axios.get(`http://localhost:5001/api/subjects/${id}/notes`)
                ]);

                setSubject(subjectRes.data);
                setPracticals(practicalsRes.data);
                setNotes(notesRes.data);
            } catch (err) {
                console.error(err);
                setError('Error fetching subject details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSubjectData();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="w-full h-[50vh] flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading details...</p>
            </div>
        );
    }

    if (error || !subject) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500 font-medium">{error || 'Subject not found'}</p>
                <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
            </Link>

            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <BookOpen size={24} />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{subject.name}</h1>
                </div>

                <p className="text-lg text-gray-600 mb-6 leading-relaxed max-w-3xl">
                    {subject.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                    <div className="flex items-center text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                        <Clock size={16} className="mr-2" />
                        Semester {subject.semester}
                    </div>
                    <div className="flex items-center gap-2">
                        {subject.courses.map((course, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg">
                                {course}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <nav className="flex space-x-1 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('practicals')}
                        className={clsx(
                            "px-5 py-3 text-sm font-medium border-b-2 transition-colors",
                            activeTab === 'practicals'
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        )}
                    >
                        Practicals ({practicals.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('notes')}
                        className={clsx(
                            "px-5 py-3 text-sm font-medium border-b-2 transition-colors",
                            activeTab === 'notes'
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        )}
                    >
                        Notes & Resources ({notes.length})
                    </button>
                </nav>
            </div>

            <div className="animate-in slide-in-from-bottom-2 duration-300">
                {activeTab === 'practicals' && (
                    <div className="space-y-4">
                        {practicals.length === 0 ? (
                            <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100 border-dashed">
                                No practicals available for this subject yet.
                            </div>
                        ) : (
                            practicals.map((practical) => (
                                <PracticalCard
                                    key={practical._id}
                                    title={practical.title}
                                    problemStatement={practical.problemStatement}
                                    solution={practical.solution}
                                />
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'notes' && (
                    <div className="space-y-4">
                        {notes.length === 0 ? (
                            <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100 border-dashed">
                                No notes available for this subject yet.
                            </div>
                        ) : (
                            notes.map((note) => (
                                <NotesCard
                                    key={note._id}
                                    unit={note.unit}
                                    content={note.content}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubjectDetails;
