import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Loader2, Code2, FileText, Building2 } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';

interface PYQData {
    _id: string;
    company: string;
    question: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    tags: string[];
}

const PYQCodePage = () => {
    const { id } = useParams<{ id: string }>();
    const [pyq, setPyq] = useState<PYQData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPYQ = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/subjects/pyq/${id}`);
                setPyq(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPYQ();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (!pyq) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-red-500 font-medium mb-4">Question not found</p>
                    <Link to="/" className="text-blue-600 hover:underline">
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const difficultyColors = {
        Easy: 'bg-green-100 text-green-700 border-green-200',
        Medium: 'bg-amber-100 text-amber-700 border-amber-200',
        Hard: 'bg-red-100 text-red-700 border-red-200',
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
                <div className="max-w-[1800px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Back to Dashboard"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                                <Code2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Interview Coding Question</h1>
                                <p className="text-sm text-gray-500">{pyq.company}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Split View */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel - Problem Statement */}
                <div className="w-1/2 border-r border-gray-200 bg-white overflow-y-auto">
                    <div className="p-8 max-w-3xl">
                        <div className="flex items-center gap-2 mb-6">
                            <FileText className="w-5 h-5 text-purple-600" />
                            <h2 className="text-2xl font-bold text-gray-900">Problem Statement</h2>
                        </div>

                        <div className="mb-6 flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
                                <Building2 className="w-4 h-4 text-purple-600" />
                                <span className="font-semibold text-purple-900">{pyq.company}</span>
                            </div>
                            <span className={`px-4 py-2 text-sm font-bold rounded-lg border ${difficultyColors[pyq.difficulty]}`}>
                                {pyq.difficulty}
                            </span>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-8">
                                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                                    {pyq.question}
                                </p>
                            </div>
                        </div>

                        {/* Tags */}
                        {pyq.tags && pyq.tags.length > 0 && (
                            <div className="mt-8 border-t border-gray-200 pt-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Topics</h3>
                                <div className="flex flex-wrap gap-2">
                                    {pyq.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-medium rounded-full border border-purple-200"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tips Section */}
                        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-amber-900 mb-3">💡 Tips</h3>
                            <ul className="space-y-2 text-amber-800 text-sm">
                                <li>• Understand the problem requirements clearly</li>
                                <li>• Think about edge cases</li>
                                <li>• Consider time and space complexity</li>
                                <li>• Test with multiple inputs</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Code Editor */}
                <div className="w-1/2 bg-gray-50 overflow-y-auto">
                    <div className="p-6 h-full">
                        <CodeEditor />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PYQCodePage;
