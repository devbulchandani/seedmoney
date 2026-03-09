import { useState, useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Loader2, CheckCircle2, XCircle, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface MCQData {
    _id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    company?: string;
    tags?: string[];
    subjectId?: string;
}

const MCQPage = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type') || 'pyq';
    const subjectId = searchParams.get('subjectId');
    
    const [mcq, setMcq] = useState<MCQData | null>(null);
    const [allQuestions, setAllQuestions] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch current question
                const endpoint = type === 'viva' 
                    ? `http://localhost:5001/api/subjects/viva/${id}`
                    : `http://localhost:5001/api/subjects/pyq/${id}`;
                const response = await axios.get(endpoint);
                setMcq(response.data);
                
                // Fetch all questions of this type for navigation
                if (response.data.subjectId || subjectId) {
                    const sid = response.data.subjectId || subjectId;
                    const listEndpoint = type === 'viva'
                        ? `http://localhost:5001/api/subjects/${sid}/vivas`
                        : `http://localhost:5001/api/subjects/${sid}/pyqs`;
                    const listResponse = await axios.get(listEndpoint);
                    
                    let questions = listResponse.data;
                    // For PYQs, filter only MCQ type
                    if (type === 'pyq') {
                        questions = questions.filter((q: any) => q.type === 'mcq');
                    }
                    
                    setAllQuestions(questions);
                    const index = questions.findIndex((q: any) => q._id === id);
                    setCurrentIndex(index >= 0 ? index : 0);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, type, subjectId]);

    const handleNext = () => {
        if (currentIndex < allQuestions.length - 1) {
            const nextQuestion = allQuestions[currentIndex + 1];
            const sid = mcq?.subjectId || subjectId;
            navigate(`/mcq/${nextQuestion._id}?type=${type}${sid ? `&subjectId=${sid}` : ''}`);
            setSelectedAnswer(null);
            setSubmitted(false);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            const prevQuestion = allQuestions[currentIndex - 1];
            const sid = mcq?.subjectId || subjectId;
            navigate(`/mcq/${prevQuestion._id}?type=${type}${sid ? `&subjectId=${sid}` : ''}`);
            setSelectedAnswer(null);
            setSubmitted(false);
        }
    };

    const handleSubmit = () => {
        if (selectedAnswer !== null) {
            setSubmitted(true);
        }
    };

    const handleReset = () => {
        setSelectedAnswer(null);
        setSubmitted(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (!mcq) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-red-500 font-medium mb-4">Question not found</p>
                    <Link to="/" className="text-blue-600 hover:underline">
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const isCorrect = submitted && selectedAnswer === mcq.correctAnswer;
    const isWrong = submitted && selectedAnswer !== mcq.correctAnswer;

    const difficultyColors = {
        Easy: 'bg-green-100 text-green-700 border-green-200',
        Medium: 'bg-amber-100 text-amber-700 border-amber-200',
        Hard: 'bg-red-100 text-red-700 border-red-200',
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <Link
                    to="/"
                    className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
                >
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </Link>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-blue-600 p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-bold">
                                {type === 'viva' ? 'Viva Question' : 'Interview Question'}
                            </h1>
                            {mcq.difficulty && (
                                <span className={clsx(
                                    'px-4 py-1.5 text-sm font-bold rounded-full',
                                    difficultyColors[mcq.difficulty]
                                )}>
                                    {mcq.difficulty}
                                </span>
                            )}
                        </div>
                        {mcq.company && (
                            <p className="text-blue-100 font-medium">Company: {mcq.company}</p>
                        )}
                        {mcq.tags && mcq.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {mcq.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-blue-700 text-blue-100 text-xs font-medium rounded-full border border-blue-500"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Question */}
                    <div className="p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
                            {mcq.question}
                        </h2>

                        {/* Options */}
                        <div className="space-y-3 mb-6">
                            {mcq.options.map((option, index) => {
                                const isSelected = selectedAnswer === index;
                                const isCorrectOption = index === mcq.correctAnswer;
                                const showCorrect = submitted && isCorrectOption;
                                const showWrong = submitted && isSelected && !isCorrectOption;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => !submitted && setSelectedAnswer(index)}
                                        disabled={submitted}
                                        className={clsx(
                                            'w-full text-left p-4 rounded-xl border-2 transition-all',
                                            'flex items-center gap-3',
                                            {
                                                'border-gray-200 hover:border-blue-400 hover:bg-blue-50': !submitted && !isSelected,
                                                'border-blue-500 bg-blue-50': !submitted && isSelected,
                                                'border-green-500 bg-green-50': showCorrect,
                                                'border-red-500 bg-red-50': showWrong,
                                                'cursor-not-allowed': submitted,
                                                'cursor-pointer': !submitted,
                                            }
                                        )}
                                    >
                                        <div className={clsx(
                                            'w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold',
                                            {
                                                'border-gray-300 text-gray-600': !submitted && !isSelected,
                                                'border-blue-500 bg-blue-500 text-white': !submitted && isSelected,
                                                'border-green-500 bg-green-500 text-white': showCorrect,
                                                'border-red-500 bg-red-500 text-white': showWrong,
                                            }
                                        )}>
                                            {String.fromCharCode(65 + index)}
                                        </div>
                                        <span className={clsx(
                                            'flex-1 font-medium',
                                            {
                                                'text-gray-700': !submitted,
                                                'text-green-900': showCorrect,
                                                'text-red-900': showWrong,
                                            }
                                        )}>
                                            {option}
                                        </span>
                                        {showCorrect && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                                        {showWrong && <XCircle className="w-6 h-6 text-red-600" />}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex gap-3">
                                {!submitted ? (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={selectedAnswer === null}
                                        className={clsx(
                                            'px-6 py-3 rounded-lg font-semibold transition-all',
                                            selectedAnswer !== null
                                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        )}
                                    >
                                        Submit Answer
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleReset}
                                        className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
                                    >
                                        Try Again
                                    </button>
                                )}
                            </div>

                            {/* Navigation Buttons */}
                            {allQuestions.length > 1 && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handlePrevious}
                                        disabled={currentIndex === 0}
                                        className={clsx(
                                            'px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-2',
                                            currentIndex === 0
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        )}
                                        title="Previous Question"
                                    >
                                        <ChevronLeft size={20} />
                                        Previous
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={currentIndex === allQuestions.length - 1}
                                        className={clsx(
                                            'px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-2',
                                            currentIndex === allQuestions.length - 1
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        )}
                                        title="Next Question"
                                    >
                                        Next
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Question Counter */}
                        {allQuestions.length > 1 && (
                            <div className="mt-4 text-sm text-gray-500 text-center">
                                Question {currentIndex + 1} of {allQuestions.length}
                            </div>
                        )}

                        {/* Result */}
                        {submitted && (
                            <div className={clsx(
                                'mt-6 p-6 rounded-xl border-2 animate-in fade-in duration-300',
                                isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                            )}>
                                <div className="flex items-start gap-3">
                                    {isCorrect ? (
                                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    ) : (
                                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                    )}
                                    <div className="flex-1">
                                        <h3 className={clsx(
                                            'font-bold text-lg mb-2',
                                            isCorrect ? 'text-green-900' : 'text-red-900'
                                        )}>
                                            {isCorrect ? 'Correct!' : 'Incorrect'}
                                        </h3>
                                        {mcq.explanation && (
                                            <div className="flex items-start gap-2 mt-3">
                                                <Lightbulb className={clsx(
                                                    'w-5 h-5 flex-shrink-0 mt-0.5',
                                                    isCorrect ? 'text-green-600' : 'text-red-600'
                                                )} />
                                                <p className={clsx(
                                                    'text-sm leading-relaxed',
                                                    isCorrect ? 'text-green-800' : 'text-red-800'
                                                )}>
                                                    {mcq.explanation}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MCQPage;
