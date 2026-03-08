import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Loader2, BookOpen, Clock } from 'lucide-react';
import PracticalCard from '../components/PracticalCard';
import NotesCard from '../components/NotesCard';
import PYQCard from '../components/PYQCard';
import VivaCard from '../components/VivaCard';
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
    title: string;
    driveUrl: string;
    unit?: number;
}

interface PYQ {
    _id: string;
    company: string;
    question: string;
    type: 'mcq' | 'code';
    difficulty: 'Easy' | 'Medium' | 'Hard';
    tags: string[];
}

interface Viva {
    _id: string;
    question: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
}

const SubjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [subject, setSubject] = useState<SubjectDetailsData | null>(null);
    const [practicals, setPracticals] = useState<Practical[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);
    const [pyqs, setPyqs] = useState<PYQ[]>([]);
    const [vivas, setVivas] = useState<Viva[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'practicals' | 'notes' | 'pyqs' | 'vivas'>('practicals');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubjectData = async () => {
            try {
                setLoading(true);
                const [subjectRes, practicalsRes, notesRes, pyqsRes, vivasRes] = await Promise.all([
                    axios.get(`http://localhost:5001/api/subjects/${id}`),
                    axios.get(`http://localhost:5001/api/subjects/${id}/practicals`),
                    axios.get(`http://localhost:5001/api/subjects/${id}/notes`),
                    axios.get(`http://localhost:5001/api/subjects/${id}/pyqs`),
                    axios.get(`http://localhost:5001/api/subjects/${id}/vivas`)
                ]);

                setSubject(subjectRes.data);
                setPracticals(practicalsRes.data);
                setNotes(notesRes.data);
                setPyqs(pyqsRes.data);
                setVivas(vivasRes.data);
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
        <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-8 transition-colors group">
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
            </Link>

            <div className="mb-10 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                        <BookOpen size={28} />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">{subject.name}</h1>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {subject.description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-6">
                    <div className="flex items-center text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-lg shadow-sm">
                        <Clock size={16} className="mr-2 text-blue-600" />
                        Semester {subject.semester}
                    </div>
                    {subject.courses.map((course, idx) => (
                        <span key={idx} className="bg-white/80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 shadow-sm">
                            {course}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <nav className="flex">
                    <button
                        onClick={() => setActiveTab('practicals')}
                        className={clsx(
                            "flex-1 px-6 py-4 text-sm font-semibold border-b-2 transition-all",
                            activeTab === 'practicals'
                                ? "border-blue-500 text-blue-600 bg-blue-50"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        )}
                    >
                        Practicals ({practicals.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('notes')}
                        className={clsx(
                            "flex-1 px-6 py-4 text-sm font-semibold border-b-2 transition-all",
                            activeTab === 'notes'
                                ? "border-blue-500 text-blue-600 bg-blue-50"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        )}
                    >
                        Notes & Resources ({notes.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('pyqs')}
                        className={clsx(
                            "flex-1 px-6 py-4 text-sm font-semibold border-b-2 transition-all",
                            activeTab === 'pyqs'
                                ? "border-blue-500 text-blue-600 bg-blue-50"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        )}
                    >
                        Interview Questions ({pyqs.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('vivas')}
                        className={clsx(
                            "flex-1 px-6 py-4 text-sm font-semibold border-b-2 transition-all",
                            activeTab === 'vivas'
                                ? "border-blue-500 text-blue-600 bg-blue-50"
                                : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        )}
                    >
                        Viva Questions ({vivas.length})
                    </button>
                </nav>
            </div>

            <div className="animate-in slide-in-from-bottom-2 duration-300">
                {activeTab === 'practicals' && (
                    <div className="space-y-4">
                        {practicals.length === 0 ? (
                            <div className="text-center py-16 text-gray-500 bg-white rounded-2xl border border-gray-200 border-dashed">
                                No practicals available for this subject yet.
                            </div>
                        ) : (
                            practicals.map((practical) => (
                                <PracticalCard
                                    key={practical._id}
                                    id={practical._id}
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
                            <div className="text-center py-16 text-gray-500 bg-white rounded-2xl border border-gray-200 border-dashed">
                                No notes available for this subject yet.
                            </div>
                        ) : (
                            notes.map((note) => (
                                <NotesCard
                                    key={note._id}
                                    title={note.title}
                                    driveUrl={note.driveUrl}
                                    unit={note.unit}
                                />
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'pyqs' && (
                    <div className="space-y-4">
                        {pyqs.length === 0 ? (
                            <div className="text-center py-16 text-gray-500 bg-white rounded-2xl border border-gray-200 border-dashed">
                                No interview questions available for this subject yet.
                            </div>
                        ) : (
                            pyqs.map((pyq) => (
                                <PYQCard
                                    key={pyq._id}
                                    id={pyq._id}
                                    company={pyq.company}
                                    question={pyq.question}
                                    type={pyq.type}
                                    difficulty={pyq.difficulty}
                                    tags={pyq.tags}
                                />
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'vivas' && (
                    <div className="space-y-4">
                        {vivas.length === 0 ? (
                            <div className="text-center py-16 text-gray-500 bg-white rounded-2xl border border-gray-200 border-dashed">
                                No viva questions available for this subject yet.
                            </div>
                        ) : (
                            vivas.map((viva) => (
                                <VivaCard
                                    key={viva._id}
                                    id={viva._id}
                                    question={viva.question}
                                    difficulty={viva.difficulty}
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
