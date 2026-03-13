import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';

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
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
            <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Link
                                to={`/practical/${id}?subjectId=${subjectId}`}
                                className="text-[#2874A6] font-medium hover:underline flex items-center gap-1 group"
                            >
                                {title}
                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </div>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
                        >
                            {isExpanded ? (
                                <>
                                    Hide Details <ChevronUp size={14} />
                                </>
                            ) : (
                                <>
                                    View Details <ChevronDown size={14} />
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 p-3 rounded border border-gray-200">
                            {problemStatement}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PracticalCard;
