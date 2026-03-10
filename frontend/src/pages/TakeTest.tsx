import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Loader2, Clock, CheckCircle2, XCircle } from 'lucide-react';
import clsx from 'clsx';

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
                setTimeLeft(response.data.duration * 60); // Convert to seconds
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
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (!test) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-red-500 font-medium mb-4">Test not found</p>
                    <Link to="/tests" className="text-blue-600 hover:underline">
                        Back to Tests
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

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{test.title}</h1>
                            <p className="text-gray-600">{test.subjectId.name}</p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                            <h2 className="font-bold text-gray-900 mb-4">Test Instructions:</h2>
                            <ul className="space-y-2 text-gray-700 text-sm">
                                <li>• Total Questions: {test.totalQuestions}</li>
                                <li>• Duration: {test.duration} minutes</li>
                                <li>• Difficulty: {test.difficulty}</li>
                                <li>• Each question has 4 options with only one correct answer</li>
                                <li>• You can navigate between questions using Next/Previous buttons</li>
                                <li>• The test will auto-submit when time runs out</li>
                                <li>• Click "Submit Test" when you're done to see your results</li>
                            </ul>
                        </div>

                        <button
                            onClick={handleStartTest}
                            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
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
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
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

                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                            <div className="grid grid-cols-2 gap-6 text-center">
                                <div>
                                    <div className="text-4xl font-bold text-blue-600 mb-2">{score}/{test.totalQuestions}</div>
                                    <div className="text-sm text-gray-600">Correct Answers</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-blue-600 mb-2">{percentage}%</div>
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
                                        "p-4 rounded-lg border-2",
                                        isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                                    )}>
                                        <div className="flex items-start gap-3">
                                            {isCorrect ? (
                                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                            )}
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 mb-2">Q{index + 1}. {q.question}</p>
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-semibold">Correct Answer:</span> {q.options[q.correctAnswer]}
                                                </p>
                                                {!isCorrect && userAnswer !== null && (
                                                    <p className="text-sm text-red-700 mt-1">
                                                        <span className="font-semibold">Your Answer:</span> {q.options[userAnswer]}
                                                    </p>
                                                )}
                                                {userAnswer === null && (
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        <span className="font-semibold">Your Answer:</span> Not answered
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex gap-4">
                            <Link
                                to="/tests"
                                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold text-center hover:bg-gray-300 transition-colors"
                            >
                                Back to Tests
                            </Link>
                            <button
                                onClick={() => window.location.reload()}
                                className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Retake Test
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Test Taking Screen
    const question = test.questions[currentQuestion];
    const answeredCount = answers.filter(a => a !== null).length;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-bold text-gray-900">{test.title}</h2>
                            <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {test.totalQuestions}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-600">
                                Answered: {answeredCount}/{test.totalQuestions}
                            </div>
                            <div className={clsx(
                                "flex items-center gap-2 px-4 py-2 rounded-lg font-bold",
                                timeLeft < 60 ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                            )}>
                                <Clock className="w-5 h-5" />
                                {formatTime(timeLeft)}
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
                            >
                                Submit Test
                            </button>
                        </div>
                    </div>
                </div>

                {/* Question */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                        {question.question}
                    </h3>

                    <div className="space-y-3">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                className={clsx(
                                    "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3",
                                    answers[currentQuestion] === index
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                                )}
                            >
                                <div className={clsx(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                                    answers[currentQuestion] === index
                                        ? "border-blue-500 bg-blue-500"
                                        : "border-gray-300"
                                )}>
                                    {answers[currentQuestion] === index && (
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                    )}
                                </div>
                                <span className="font-medium text-gray-900">{option}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className={clsx(
                            "px-6 py-3 rounded-xl font-semibold transition-all",
                            currentQuestion === 0
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        )}
                    >
                        Previous
                    </button>

                    <div className="flex gap-2">
                        {test.questions.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentQuestion(index)}
                                className={clsx(
                                    "w-10 h-10 rounded-lg font-semibold text-sm transition-all",
                                    index === currentQuestion
                                        ? "bg-blue-600 text-white"
                                        : answers[index] !== null
                                        ? "bg-green-100 text-green-700 border border-green-200"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                )}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={currentQuestion === test.totalQuestions - 1}
                        className={clsx(
                            "px-6 py-3 rounded-xl font-semibold transition-all",
                            currentQuestion === test.totalQuestions - 1
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                        )}
                    >
                        Next
                    </button>
                </div>

                {/* Submit Confirmation Modal */}
                {showSubmitModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Submit Test?</h3>
                            
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
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
                                <p className="text-sm text-amber-600 mb-6 bg-amber-50 border border-amber-200 rounded-lg p-3">
                                    ⚠️ You have {test.totalQuestions - answeredCount} unanswered question(s). Unanswered questions will be marked as incorrect.
                                </p>
                            )}

                            <p className="text-gray-600 mb-6">
                                Are you sure you want to submit your test? You won't be able to change your answers after submission.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowSubmitModal(false)}
                                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmSubmit}
                                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all"
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
