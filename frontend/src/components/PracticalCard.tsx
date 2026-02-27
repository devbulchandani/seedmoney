import { useState } from 'react';
import { ChevronDown, ChevronUp, Code } from 'lucide-react';

interface PracticalCardProps {
    title: string;
    problemStatement: string;
    solution: string;
}

const PracticalCard = ({ title, problemStatement, solution }: PracticalCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="card overflow-hidden">
            <div
                className="p-5 cursor-pointer hover:bg-gray-50 transition-colors flex items-start justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div>
                    <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                        <Code size={18} className="text-blue-500" />
                        {title}
                    </h4>
                    <p className="text-sm text-gray-600">{problemStatement}</p>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
            </div>

            {isOpen && (
                <div className="border-t border-gray-100 bg-gray-50 p-5">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Solution</div>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-gray-800">
                        <code>{solution}</code>
                    </pre>
                </div>
            )}
        </div>
    );
};

export default PracticalCard;
