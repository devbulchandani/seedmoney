import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Loader2, BookOpen, Clock } from 'lucide-react';
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
                <Loader2 className="w-10 h-10 text-[#0d4d6b] animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading details...</p>
            </div>
        );
    }

    if (error || !subject) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500 font-medium">{error || 'Subject not found'}</p>
                <Link to="/" className="text-[#2874A6] hover:underline mt-4 inline-block">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-600">
                <Link to="/" className="text-[#2874A6] hover:underline">Home</Link>
                <span className="mx-2">»</span>
                <Link to="/" className="text-[#2874A6] hover:underline">Subjects</Link>
                <span className="mx-2">»</span>
                <span>{subject.name}</span>
            </div>

            {/* Page Title Bar */}
            <div className="bg-[#2196F3] text-white px-6 py-3 rounded-sm">
                <h1 className="text-2xl font-semibold">{subject.name}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-3">
                    {/* Subject Info */}
                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 mb-6">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-[#0d4d6b] text-white rounded flex items-center justify-center">
                                <BookOpen size={24} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">About This Subject</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {subject.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded">
                                <Clock size={14} className="mr-2 text-[#0d4d6b]" />
                                Semester {subject.semester}
                            </div>
                            {subject.courses.map((course, idx) => (
                                <span key={idx} className="bg-gray-50 text-gray-800 px-3 py-1.5 rounded text-sm">
                                    {course}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden mb-6">
                        <nav className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('practicals')}
                                className={clsx(
                                    "flex-1 px-4 py-3 text-sm font-medium transition-colors",
                                    activeTab === 'practicals'
                                        ? "bg-[#0d4d6b] text-white"
                                        : "text-gray-700 hover:bg-gray-50"
                                )}
                            >
                                Practicals ({practicals.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('notes')}
                                className={clsx(
                                    "flex-1 px-4 py-3 text-sm font-medium transition-colors border-l border-gray-200",
                                    activeTab === 'notes'
                                        ? "bg-[#0d4d6b] text-white"
                                        : "text-gray-700 hover:bg-gray-50"
                                )}
                            >
                                Notes ({notes.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('pyqs')}
                                className={clsx(
                                    "flex-1 px-4 py-3 text-sm font-medium transition-colors border-l border-gray-200",
                                    activeTab === 'pyqs'
                                        ? "bg-[#0d4d6b] text-white"
                                        : "text-gray-700 hover:bg-gray-50"
                                )}
                            >
                                Interview Questions ({pyqs.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('vivas')}
                                className={clsx(
                                    "flex-1 px-4 py-3 text-sm font-medium transition-colors border-l border-gray-200",
                                    activeTab === 'vivas'
                                        ? "bg-[#0d4d6b] text-white"
                                        : "text-gray-700 hover:bg-gray-50"
                                )}
                            >
                                Viva Questions ({vivas.length})
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div>
                        {activeTab === 'practicals' && (
                            <div className="space-y-3">
                                {practicals.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500 bg-white border border-gray-200 rounded-sm">
                                        No practicals available for this subject yet.
                                    </div>
                                ) : (
                                    practicals.map((practical) => (
                                        <PracticalCard
                                            key={practical._id}
                                            id={practical._id}
                                            subjectId={id!}
                                            title={practical.title}
                                            problemStatement={practical.problemStatement}
                                            solution={practical.solution}
                                        />
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'notes' && (
                            <div className="space-y-3">
                                {notes.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500 bg-white border border-gray-200 rounded-sm">
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
                            <div className="space-y-3">
                                {pyqs.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500 bg-white border border-gray-200 rounded-sm">
                                        No interview questions available for this subject yet.
                                    </div>
                                ) : (
                                    pyqs.map((pyq) => (
                                        <PYQCard
                                            key={pyq._id}
                                            id={pyq._id}
                                            subjectId={id!}
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
                            <div className="space-y-3">
                                {vivas.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500 bg-white border border-gray-200 rounded-sm">
                                        No viva questions available for this subject yet.
                                    </div>
                                ) : (
                                    vivas.map((viva) => (
                                        <VivaCard
                                            key={viva._id}
                                            id={viva._id}
                                            subjectId={id!}
                                            question={viva.question}
                                            difficulty={viva.difficulty}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-[#5a5a5a] text-white p-4 rounded-sm mb-4">
                        <h3 className="font-semibold mb-3">Resources</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Practicals:</span>
                                <span className="font-semibold">{practicals.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Notes:</span>
                                <span className="font-semibold">{notes.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Interview Q's:</span>
                                <span className="font-semibold">{pyqs.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Viva Q's:</span>
                                <span className="font-semibold">{vivas.length}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 p-4 rounded-sm">
                        <h3 className="font-semibold text-gray-900 mb-3 text-sm">Subject Info</h3>
                        <div className="space-y-2 text-xs text-gray-600">
                            <p><span className="font-medium">Semester:</span> {subject.semester}</p>
                            <p><span className="font-medium">Courses:</span> {subject.courses.join(', ')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubjectDetails;
