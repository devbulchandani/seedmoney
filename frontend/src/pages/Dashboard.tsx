import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Loader2, AlertCircle, Search, X, ChevronRight } from 'lucide-react';

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
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

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

    const allCourses = useMemo(() => {
        const courses = new Set<string>();
        subjects.forEach(s => s.courses.forEach(c => courses.add(c)));
        return Array.from(courses).sort();
    }, [subjects]);

    const alldepartments = useMemo(() => {
        const departments = new Set<string>();
        subjects.forEach(s => s.courses.forEach(c => departments.add(c)));
        return Array.from(departments).sort();
    }, [subjects]);

    const allSemesters = useMemo(() => {
        const semesters = [...new Set(subjects.map(s => s.semester))];
        return semesters.sort((a, b) => a - b);
    }, [subjects]);

    


    const filteredSubjects = useMemo(() => {
        return subjects.filter(subject => {
            const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                subject.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSemester = selectedSemester === null || subject.semester === selectedSemester;
            const matchesCourse = selectedCourse === null || subject.courses.includes(selectedCourse);
            return matchesSearch && matchesSemester && matchesCourse;
        });
    }, [subjects, searchQuery, selectedSemester, selectedCourse]);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedSemester(null);
        setSelectedCourse(null);
    };

    const hasActiveFilters = searchQuery || selectedSemester !== null || selectedCourse !== null;

    if (loading) {
        return (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#0d4d6b] animate-spin mb-4" />
                <p className="text-gray-500">Loading subjects...</p>
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

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-600">
                <Link to="/" className="text-[#2874A6] hover:underline">Home</Link>
                <span className="mx-2">»</span>
                <span>Subjects</span>
            </div>

            {/* Page Title Bar */}
            <div className="bg-[#2196F3] text-white px-6 py-3 rounded-sm">
                <h1 className="text-2xl font-semibold">Poornima University</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-3">
                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Subjects At Poornima University</h2>

                            {/* Search and Filters */}
                            <div className="mb-6 space-y-3">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search subjects..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#2874A6] focus:border-[#2874A6] outline-none text-sm"
                                        />
                                    </div>

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
                                        value={selectedCourse ?? ''}
                                        onChange={(e) => setSelectedCourse(e.target.value || null)}
                                        className="px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#2874A6] focus:border-[#2874A6] outline-none bg-white text-sm"
                                    >
                                        <option value="">Branch</option>
                                        {allCourses.map(course => (
                                            <option key={course} value={course}>{course}</option>
                                        ))}
                                    </select>

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

                            {/* Subject List */}
                            {filteredSubjects.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    {subjects.length === 0 ? 'No subjects found' : 'No subjects match your filters'}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {filteredSubjects.map((subject) => (
                                        <Link
                                            key={subject._id}
                                            to={`/subjects/${subject._id}`}
                                            className="block p-4 border border-gray-200 hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-[#2874A6] font-medium group-hover:underline flex items-center gap-2">
                                                        {subject.name}
                                                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mt-1">{subject.description}</p>
                                                    <div className="flex gap-3 mt-2 text-xs text-gray-500">
                                                        <span>Semester {subject.semester}</span>
                                                        <span>•</span>
                                                        <span>{subject.courses.join(', ')}</span>
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
                        <h3 className="font-semibold mb-3">Quick Stats</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Total Subjects:</span>
                                <span className="font-semibold">{subjects.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Showing:</span>
                                <span className="font-semibold">{filteredSubjects.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Semesters:</span>
                                <span className="font-semibold">{allSemesters.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Courses:</span>
                                <span className="font-semibold">{allCourses.length}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 p-4 rounded-sm">
                        <h3 className="font-semibold text-gray-900 mb-3 text-sm">About</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            Academic Labs provides comprehensive learning resources including practicals, 
                            previous year questions, viva questions, and timed tests for all subjects.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
