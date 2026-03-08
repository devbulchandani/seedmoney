import { FileText, ExternalLink } from 'lucide-react';

interface NotesCardProps {
    title: string;
    driveUrl: string;
    unit?: number;
}

const NotesCard = ({ title, driveUrl, unit }: NotesCardProps) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                        {unit && (
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                Unit {unit}
                            </span>
                        )}
                    </div>
                </div>
                <a
                    href={driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-medium text-sm flex items-center gap-2 shadow-sm"
                >
                    Open Notes <ExternalLink size={16} />
                </a>
            </div>
        </div>
    );
};

export default NotesCard;
