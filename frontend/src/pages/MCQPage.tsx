import { useState, useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Loader2, CheckCircle2, XCircle, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { theme, themeClasses } from '../theme';

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
                <Loader2 className="w-10 h-10 animate-spin" style={{ color: theme.colors.primary }} />
            </div>
        );
    }

    if (!mcq) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-red-500 font-medium mb-4">Question not found</p>
                    <Link to="/" className={themeClasses.link}>
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const isCorrect = submitted && selectedAnswer === mcq.correctAnswer;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex h-screen">
                {/* Left Panel - Question Info */}
                <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
                    <div className="p-6">
                        <Link
                            to="/"
                            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
                        >
                            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back
                        </Link>

                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-4">
                                <h1 className="text-xl font-bold text-gray-900">
                                    {type === 'viva' ? 'Viva Question' : 'Interview Question'}
                                </h1>
                            </div>

                            {mcq.difficulty && (
                                <span className={themeClasses.badge[mcq.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard']}>
                                    {mcq.difficulty}
                                </span>
                            )}
                        </div>

                        {mcq.company && (
                            <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200">
                                <p className="text-sm text-gray-600">Company</p>
                                <p className="font-semibold text-gray-900">{mcq.company}</p>
                            </div>
                        )}

                        {mcq.tags && mcq.tags.length > 0 && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">Tags</p>
                                <div className="flex flex-wrap gap-2">
                                    {mcq.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        {allQuestions.length > 1 && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-600 mb-3">
                                    Question {currentIndex + 1} of {allQuestions.length}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handlePrevious}
                                        disabled={currentIndex === 0}
                                        className={clsx(
                                            'flex-1 px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1',
                                            currentIndex === 0
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : themeClasses.button.secondary
                                        )}
                                    >
                                        <ChevronLeft size={16} />
                                        Previous
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={currentIndex === allQuestions.length - 1}
                                        className={clsx(
                                            'flex-1 px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1',
                                            currentIndex === allQuestions.length - 1
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : themeClasses.button.secondary
                                        )}
                                    >
                                        Next
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel - Question & Options */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-8 max-w-4xl mx-auto">
                        <div className={themeClasses.card + ' p-8'}>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
                                {mcq.question}
                            </h2>

                            {/* Options */}
                            <div className="space-y-3 mb-8">
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
                                                'w-full text-left p-4 rounded border-2 transition-all',
                                                'flex items-center gap-3',
                                                {
                                                    'border-gray-200 hover:border-[#0d4d6b] hover:bg-gray-50': !submitted && !isSelected,
                                                    'border-[#0d4d6b] bg-blue-50': !submitted && isSelected,
                                                    'border-green-500 bg-green-50': showCorrect,
                                                    'border-red-500 bg-red-50': showWrong,
                                                    'cursor-not-allowed': submitted,
                                                    'cursor-pointer': !submitted,
                                                }
                                            )}
                                        >
                                            <div className={clsx(
                                                'w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold text-sm',
                                                {
                                                    'border-gray-300 text-gray-600': !submitted && !isSelected,
                                                    'border-[#0d4d6b] bg-[#0d4d6b] text-white': !submitted && isSelected,
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
                            <div className="flex gap-3">
                                {!submitted ? (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={selectedAnswer === null}
                                        className={clsx(
                                            'px-6 py-3 rounded font-semibold transition-all',
                                            selectedAnswer !== null
                                                ? themeClasses.button.primary
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        )}
                                    >
                                        Submit Answer
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleReset}
                                        className={clsx('px-6 py-3 rounded font-semibold', themeClasses.button.secondary)}
                                    >
                                        Try Again
                                    </button>
                                )}
                            </div>

                            {/* Result */}
                            {submitted && (
                                <div className={clsx(
                                    'mt-6 p-6 rounded border-2',
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
        </div>
    );
};

export default MCQPage;
