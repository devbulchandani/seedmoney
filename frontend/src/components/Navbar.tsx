import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-105">
                        <BookOpen size={20} />
                    </div>
                    <span className="text-xl font-semibold tracking-tight text-gray-900">
                        SeedMoney
                    </span>
                </Link>
                <div className="text-sm font-medium text-gray-500">
                    Academic Platform
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
