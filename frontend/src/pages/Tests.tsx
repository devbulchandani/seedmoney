import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Loader2, AlertCircle, Search, X, ChevronRight, Clock, FileQuestion } from 'lucide-react';

interface Test {
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
}

const Tests = () => {
    const [tests, setTests] = useState<Test[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/tests');
                setTests(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to load tests. Ensure the backend is running.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTests();
    }, []);

    const allSemesters = useMemo(() => {
        const semesters = [...new Set(tests.map(t => t.subjectId.semester))];
        return semesters.sort((a, b) => a - b);
    }, [tests]);

    const allCourses = useMemo(() => {
        const courses = new Set<string>();
        tests.forEach(t => t.subjectId.courses.forEach(c => courses.add(c)));
        return Array.from(courses).sort();
    }, [tests]);

    const filteredTests = useMemo(() => {
        return tests.filter(test => {
            const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                test.subjectId.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSemester = selectedSemester === null || test.subjectId.semester === selectedSemester;
            const matchesCourse = selectedCourse === null || test.subjectId.courses.includes(selectedCourse);
            const matchesDifficulty = selectedDifficulty === null || test.difficulty === selectedDifficulty;
            return matchesSearch && matchesSemester && matchesCourse && matchesDifficulty;
        });
    }, [tests, searchQuery, selectedSemester, selectedCourse, selectedDifficulty]);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedSemester(null);
        setSelectedCourse(null);
        setSelectedDifficulty(null);
    };

    const hasActiveFilters = searchQuery || selectedSemester !== null || selectedCourse !== null || selectedDifficulty !== null;

    if (loading) {
        return (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#0d4d6b] animate-spin mb-4" />
                <p className="text-gray-500">Loading tests...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full p-6 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                    <h3 className="text-red-800 font-semibold mb-1">Error</h3>
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            </div>
        );
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'text-green-600 bg-green-50';
            case 'Medium': return 'text-yellow-600 bg-yellow-50';
            case 'Hard': return 'text-red-600 bg-red-50';
            default: return 'text-blue-600 bg-blue-50';
        }
    };

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-600">
                <Link to="/" className="text-[#2874A6] hover:underline">Home</Link>
                <span className="mx-2">»</span>
                <span>Tests</span>
            </div>

            {/* Page Title Bar */}
            <div className="bg-[#2196F3] text-white px-6 py-3 rounded-sm">
                <h1 className="text-2xl font-semibold">Timed Tests</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-3">
                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Tests</h2>

                            {/* Search and Filters */}
                            <div className="mb-6 space-y-3">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search tests..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#2874A6] focus:border-[#2874A6] outline-none text-sm"
                                        />
                                    </div>

                                    <select
                                        value={selectedSemester ?? ''}
                                        onChange={(e) => setSelectedSemester(e.target.value ? Number(e.target.value) : null)}
                                        className="px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#2874A6] focus:border-[#2874A6] outline-none bg-white text-sm"
                                    >
                                        <option value="">All Semesters</option>
                                        {allSemesters.map(sem => (
                                            <option key={sem} value={sem}>Semester {sem}</option>
                                        ))}
                                    </select>

                                    <select
                                        value={selectedCourse ?? ''}
                                        onChange={(e) => setSelectedCourse(e.target.value || null)}
                                        className="px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#2874A6] focus:border-[#2874A6] outline-none bg-white text-sm"
                                    >
                                        <option value="">All Courses</option>
                                        {allCourses.map(course => (
                                            <option key={course} value={course}>{course}</option>
                                        ))}
                                    </select>

                                    <select
                                        value={selectedDifficulty ?? ''}
                                        onChange={(e) => setSelectedDifficulty(e.target.value || null)}
                                        className="px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#2874A6] focus:border-[#2874A6] outline-none bg-white text-sm"
                                    >
                                        <option value="">All Difficulties</option>
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                        <option value="Mixed">Mixed</option>
                                    </select>

                                    {hasActiveFilters && (
                                        <button
                                            onClick={clearFilters}
                                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors flex items-center gap-2 text-sm"
                                        >
                                            <X className="w-4 h-4" />
                                            Clear
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Test List */}
                            {filteredTests.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    {tests.length === 0 ? 'No tests found' : 'No tests match your filters'}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {filteredTests.map((test) => (
                                        <Link
                                            key={test._id}
                                            to={`/test/${test._id}`}
                                            className="block p-4 border border-gray-200 hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-[#2874A6] font-medium group-hover:underline flex items-center gap-2">
                                                        {test.title}
                                                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                                                    <div className="flex flex-wrap gap-3 mt-2 text-xs">
                                                        <span className="text-gray-700 font-medium">{test.subjectId.name}</span>
                                                        <span className="text-gray-400">•</span>
                                                        <span className="text-gray-600">Semester {test.subjectId.semester}</span>
                                                        <span className="text-gray-400">•</span>
                                                        <span className="flex items-center gap-1 text-gray-600">
                                                            <Clock className="w-3 h-3" />
                                                            {test.duration} min
                                                        </span>
                                                        <span className="text-gray-400">•</span>
                                                        <span className="flex items-center gap-1 text-gray-600">
                                                            <FileQuestion className="w-3 h-3" />
                                                            {test.totalQuestions} questions
                                                        </span>
                                                        <span className="text-gray-400">•</span>
                                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                                                            {test.difficulty}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-[#5a5a5a] text-white p-4 rounded-sm mb-4">
                        <h3 className="font-semibold mb-3">Test Statistics</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Total Tests:</span>
                                <span className="font-semibold">{tests.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Showing:</span>
                                <span className="font-semibold">{filteredTests.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Subjects:</span>
                                <span className="font-semibold">{new Set(tests.map(t => t.subjectId._id)).size}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 p-4 rounded-sm">
                        <h3 className="font-semibold text-gray-900 mb-3 text-sm">About Tests</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            Timed tests help you assess your knowledge and prepare for exams. 
                            Each test includes multiple-choice questions with instant feedback and detailed results.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tests;
