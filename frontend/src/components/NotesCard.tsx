import { ExternalLink } from 'lucide-react';

interface NotesCardProps {
    title: string;
    driveUrl: string;
    unit?: number;
}

const NotesCard = ({ title, driveUrl, unit }: NotesCardProps) => {
    return (
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-4">
            <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                    <a
                        href={driveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2874A6] font-medium hover:underline flex items-center gap-2 group"
                    >
                        {title}
                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    {unit && (
                        <span className="inline-block mt-1 text-xs text-gray-600">
                            Unit {unit}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotesCard;
