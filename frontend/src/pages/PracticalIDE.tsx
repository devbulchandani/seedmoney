import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Loader2, Code2, FileText } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';

interface Practical {
    _id: string;
    title: string;
    problemStatement: string;
    solution: string;
}

const PracticalIDE = () => {
    const { id } = useParams<{ id: string }>();
    const [practical, setPractical] = useState<Practical | null>(null);
    const [loading, setLoading] = useState(true);
    const [showSolution, setShowSolution] = useState(false);

    useEffect(() => {
        const fetchPractical = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/subjects/practical/${id}`);
                setPractical(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPractical();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (!practical) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-red-500 font-medium mb-4">Practical not found</p>
                    <Link to="/" className="text-blue-600 hover:underline">
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

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
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Code2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">{practical.title}</h1>
                                <p className="text-sm text-gray-500">Interactive Coding Environment</p>
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
                            <FileText className="w-5 h-5 text-blue-600" />
                            <h2 className="text-2xl font-bold text-gray-900">Problem Statement</h2>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                                    {practical.problemStatement}
                                </p>
                            </div>
                        </div>

                        {/* Solution Section */}
                        <div className="mt-8 border-t border-gray-200 pt-8">
                            <button
                                onClick={() => setShowSolution(!showSolution)}
                                className="mb-4 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-medium shadow-sm"
                            >
                                {showSolution ? 'Hide Solution' : 'Show Solution'}
                            </button>

                            {showSolution && (
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 animate-in fade-in duration-300">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Solution Approach</h3>
                                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                                        {practical.solution}
                                    </pre>
                                </div>
                            )}
                        </div>

                        {/* Tips Section */}
                        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-amber-900 mb-3">💡 Tips</h3>
                            <ul className="space-y-2 text-amber-800 text-sm">
                                <li>• Read the problem statement carefully</li>
                                <li>• Test your code with different inputs</li>
                                <li>• Consider edge cases</li>
                                <li>• Use the solution as a reference if you're stuck</li>
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

export default PracticalIDE;
