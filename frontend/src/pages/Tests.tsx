import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Loader2, AlertCircle, Search, Filter, X, FileQuestion } from 'lucide-react';
import TestCard from '../components/TestCard';

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
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500">Loading tests...</p>
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
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                        Timed Tests
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg">Practice with timed MCQ tests to prepare for exams.</p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search tests..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        {/* Semester Filter */}
                        <div className="relative min-w-[180px]">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            <select
                                value={selectedSemester ?? ''}
                                onChange={(e) => setSelectedSemester(e.target.value ? Number(e.target.value) : null)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer transition-all"
                            >
                                <option value="">All Semesters</option>
                                {allSemesters.map(sem => (
                                    <option key={sem} value={sem}>Semester {sem}</option>
                                ))}
                            </select>
                        </div>

                        {/* Course Filter */}
                        <div className="relative min-w-[180px]">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            <select
                                value={selectedCourse ?? ''}
                                onChange={(e) => setSelectedCourse(e.target.value || null)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer transition-all"
                            >
                                <option value="">All Courses</option>
                                {allCourses.map(course => (
                                    <option key={course} value={course}>{course}</option>
                                ))}
                            </select>
                        </div>

                        {/* Difficulty Filter */}
                        <div className="relative min-w-[180px]">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            <select
                                value={selectedDifficulty ?? ''}
                                onChange={(e) => setSelectedDifficulty(e.target.value || null)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer transition-all"
                            >
                                <option value="">All Difficulties</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                                <option value="Mixed">Mixed</option>
                            </select>
                        </div>

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors flex items-center gap-2 font-medium"
                            >
                                <X className="w-4 h-4" />
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Active Filters Display */}
                    {hasActiveFilters && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
                            <span className="text-sm text-gray-500 font-medium">Active filters:</span>
                            {searchQuery && (
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                    Search: "{searchQuery}"
                                </span>
                            )}
                            {selectedSemester !== null && (
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                    Semester {selectedSemester}
                                </span>
                            )}
                            {selectedCourse && (
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                    {selectedCourse}
                                </span>
                            )}
                            {selectedDifficulty && (
                                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                                    {selectedDifficulty}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Results */}
            {filteredTests.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <FileQuestion className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <div className="text-gray-400 mb-3 text-lg font-medium">
                        {tests.length === 0 ? 'No tests available' : 'No tests match your filters'}
                    </div>
                    <p className="text-gray-500 text-sm">
                        {tests.length === 0 ? 'Tests will appear here once created' : 'Try adjusting your search or filters'}
                    </p>
                </div>
            ) : (
                <>
                    <div className="text-sm text-gray-600 font-medium">
                        Showing {filteredTests.length} of {tests.length} tests
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTests.map((test) => (
                            <TestCard key={test._id} test={test} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Tests;
