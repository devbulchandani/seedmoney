import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Code2, ExternalLink } from 'lucide-react';

interface PracticalCardProps {
    id: string;
    subjectId: string;
    title: string;
    problemStatement: string;
    solution: string;
}

const PracticalCard = ({ id, subjectId, title, problemStatement }: PracticalCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
            <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Code2 className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
                            >
                                {isExpanded ? (
                                    <>
                                        Hide Details <ChevronUp size={16} />
                                    </>
                                ) : (
                                    <>
                                        View Details <ChevronDown size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                    <Link
                        to={`/practical/${id}?subjectId=${subjectId}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium text-sm flex items-center gap-2 shadow-sm"
                    >
                        Open IDE <ExternalLink size={16} />
                    </Link>
                </div>

                {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-200 animate-in fade-in duration-300">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Problem Statement:</h4>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border border-gray-200">
                            {problemStatement}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PracticalCard;
