import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Loader2, Clock, CheckCircle2, XCircle } from 'lucide-react';
import clsx from 'clsx';
import { theme, themeClasses } from '../theme';

interface Test {
    _id: string;
    title: string;
    description: string;
    duration: number;
    totalQuestions: number;
    difficulty: string;
    subjectId: {
        name: string;
    };
    questions: {
        question: string;
        options: string[];
        correctAnswer: number;
    }[];
}

const TakeTest = () => {
    const { id } = useParams<{ id: string }>();
    const [test, setTest] = useState<Test | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>([]);
    const [timeLeft, setTimeLeft] = useState(0);
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [showSubmitModal, setShowSubmitModal] = useState(false);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/tests/${id}`);
                setTest(response.data);
                setTimeLeft(response.data.duration * 60);
                setAnswers(new Array(response.data.totalQuestions).fill(null));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchTest();
        }
    }, [id]);

    useEffect(() => {
        if (testStarted && !testCompleted && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        handleSubmit();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [testStarted, testCompleted, timeLeft]);

    const handleStartTest = () => {
        setTestStarted(true);
    };

    const handleAnswerSelect = (answerIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answerIndex;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < (test?.totalQuestions || 0) - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = () => {
        setShowSubmitModal(true);
    };

    const confirmSubmit = () => {
        if (!test) return;
        
        let correctCount = 0;
        answers.forEach((answer, index) => {
            if (answer === test.questions[index].correctAnswer) {
                correctCount++;
            }
        });
        
        setScore(correctCount);
        setTestCompleted(true);
        setShowSubmitModal(false);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 animate-spin" style={{ color: theme.colors.primary }} />
            </div>
        );
    }

    if (!test) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-red-500 font-medium mb-4">Test not found</p>
                    <Link to="/tests" className={themeClasses.link}>
                        Return to Tests
                    </Link>
                </div>
            </div>
        );
    }

    // Start Screen
    if (!testStarted) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link
                        to="/tests"
                        className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
                    >
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Tests
                    </Link>

                    <div className={themeClasses.card + ' p-8'}>
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: theme.colors.primary }}>
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{test.title}</h1>
                            <p className="text-gray-600">{test.subjectId.name}</p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded p-6 mb-8">
                            <h2 className="font-bold text-gray-900 mb-4">Test Instructions:</h2>
                            <ul className="space-y-2 text-gray-700 text-sm">
                                <li>• Total Questions: {test.totalQuestions}</li>
                                <li>• Duration: {test.duration} minutes</li>
                                <li>• Difficulty: {test.difficulty}</li>
                                <li>• Each question has 4 options with only one correct answer</li>
                                <li>• You can navigate between questions using Next/Previous buttons</li>
                                <li>• The test will auto-submit when time runs out</li>
                                <li>• Click "Submit Test" button at the top when you're done</li>
                            </ul>
                        </div>

                        <button
                            onClick={handleStartTest}
                            className={clsx('w-full py-4 rounded font-bold text-lg', themeClasses.button.primary)}
                        >
                            Start Test
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Results Screen
    if (testCompleted) {
        const percentage = Math.round((score / test.totalQuestions) * 100);
        const passed = percentage >= 60;

        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className={themeClasses.card + ' p-8'}>
                        <div className="text-center mb-8">
                            <div className={clsx(
                                "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4",
                                passed ? "bg-green-100" : "bg-red-100"
                            )}>
                                {passed ? (
                                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                                ) : (
                                    <XCircle className="w-10 h-10 text-red-600" />
                                )}
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {passed ? 'Congratulations!' : 'Test Completed'}
                            </h1>
                            <p className="text-gray-600">{test.title}</p>
                        </div>

                        <div className="bg-gray-50 rounded p-6 mb-8">
                            <div className="grid grid-cols-2 gap-6 text-center">
                                <div>
                                    <div className="text-4xl font-bold mb-2" style={{ color: theme.colors.primary }}>{score}/{test.totalQuestions}</div>
                                    <div className="text-sm text-gray-600">Correct Answers</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold mb-2" style={{ color: theme.colors.primary }}>{percentage}%</div>
                                    <div className="text-sm text-gray-600">Score</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <h2 className="font-bold text-gray-900 text-lg">Answer Review:</h2>
                            {test.questions.map((q, index) => {
                                const userAnswer = answers[index];
                                const isCorrect = userAnswer === q.correctAnswer;
                                
                                return (
                                    <div key={index} className={clsx(
                                        "p-4 rounded border-2",
                                        isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                                    )}>
                                        <div className="flex items-start gap-3">
                                            {isCorrect ? (
                                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                            )}
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-2">Q{index + 1}: {q.question}</p>
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-semibold">Your answer:</span> {userAnswer !== null ? q.options[userAnswer] : 'Not answered'}
                                                </p>
                                                {!isCorrect && (
                                                    <p className="text-sm text-gray-700 mt-1">
                                                        <span className="font-semibold">Correct answer:</span> {q.options[q.correctAnswer]}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <Link
                            to="/tests"
                            className={clsx('w-full py-3 rounded font-semibold text-center block', themeClasses.button.primary)}
                        >
                            Back to Tests
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Taking Test Screen
    const question = test.questions[currentQuestion];
    const answeredCount = answers.filter(a => a !== null).length;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex h-screen">
                {/* Left Panel - Test Info & Navigation */}
                <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
                    <div className="p-6">
                        <Link
                            to="/tests"
                            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
                        >
                            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Exit Test
                        </Link>

                        <div className="mb-6">
                            <h2 className="font-bold text-gray-900 mb-2">{test.title}</h2>
                            <p className="text-sm text-gray-600">{test.subjectId.name}</p>
                        </div>

                        <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">Time Left</span>
                                <div className={clsx(
                                    "flex items-center gap-2 px-3 py-1 rounded font-bold text-sm",
                                    timeLeft < 60 ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                                )}>
                                    <Clock className="w-4 h-4" />
                                    {formatTime(timeLeft)}
                                </div>
                            </div>
                            <div className="text-sm text-gray-600">
                                Answered: {answeredCount}/{test.totalQuestions}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Questions</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {test.questions.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentQuestion(index)}
                                        className={clsx(
                                            "w-full aspect-square rounded text-sm font-semibold transition-all",
                                            index === currentQuestion
                                                ? "text-white"
                                                : answers[index] !== null
                                                ? "bg-green-100 text-green-700 border border-green-200"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        )}
                                        style={index === currentQuestion ? { backgroundColor: theme.colors.primary } : {}}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className={clsx('w-full py-3 rounded font-semibold', themeClasses.button.success)}
                        >
                            Submit Test
                        </button>
                    </div>
                </div>

                {/* Right Panel - Question & Options */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-8 max-w-4xl mx-auto">
                        <div className={themeClasses.card + ' p-8'}>
                            <div className="mb-6">
                                <div className="text-sm text-gray-600 mb-2">
                                    Question {currentQuestion + 1} of {test.totalQuestions}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 leading-relaxed">
                                    {question.question}
                                </h2>
                            </div>

                            <div className="space-y-3 mb-8">
                                {question.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerSelect(index)}
                                        className={clsx(
                                            "w-full text-left p-4 rounded border-2 transition-all flex items-center gap-3",
                                            answers[currentQuestion] === index
                                                ? "border-[#0d4d6b] bg-blue-50"
                                                : "border-gray-200 hover:border-[#0d4d6b] hover:bg-gray-50"
                                        )}
                                    >
                                        <div className={clsx(
                                            "w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold text-sm",
                                            answers[currentQuestion] === index
                                                ? "border-[#0d4d6b] bg-[#0d4d6b] text-white"
                                                : "border-gray-300 text-gray-600"
                                        )}>
                                            {String.fromCharCode(65 + index)}
                                        </div>
                                        <span className="flex-1 font-medium text-gray-900">
                                            {option}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentQuestion === 0}
                                    className={clsx(
                                        "px-6 py-3 rounded font-semibold transition-all",
                                        currentQuestion === 0
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : themeClasses.button.secondary
                                    )}
                                >
                                    Previous
                                </button>

                                <button
                                    onClick={handleNext}
                                    disabled={currentQuestion === test.totalQuestions - 1}
                                    className={clsx(
                                        "px-6 py-3 rounded font-semibold transition-all",
                                        currentQuestion === test.totalQuestions - 1
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : themeClasses.button.primary
                                    )}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Confirmation Modal */}
                {showSubmitModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded shadow-2xl max-w-md w-full p-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Submit Test?</h3>
                            
                            <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Total Questions:</span>
                                        <span className="font-bold text-gray-900">{test.totalQuestions}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Answered:</span>
                                        <span className="font-bold text-green-600">{answeredCount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Unanswered:</span>
                                        <span className="font-bold text-red-600">{test.totalQuestions - answeredCount}</span>
                                    </div>
                                </div>
                            </div>

                            {answeredCount < test.totalQuestions && (
                                <p className="text-sm text-amber-600 mb-6 bg-amber-50 border border-amber-200 rounded p-3">
                                    ⚠️ You have {test.totalQuestions - answeredCount} unanswered question(s). Unanswered questions will be marked as incorrect.
                                </p>
                            )}

                            <p className="text-gray-600 mb-6">
                                Are you sure you want to submit your test? You won't be able to change your answers after submission.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowSubmitModal(false)}
                                    className={clsx('flex-1 px-4 py-3 rounded font-semibold', themeClasses.button.secondary)}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmSubmit}
                                    className={clsx('flex-1 px-4 py-3 rounded font-semibold', themeClasses.button.success)}
                                >
                                    Submit Test
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TakeTest;
