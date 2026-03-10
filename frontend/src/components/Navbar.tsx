import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:bg-blue-700 transition-colors">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                SeedMoney
                            </h1>
                            <p className="text-xs text-gray-500 font-medium">Academic Platform</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link 
                            to="/" 
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            Subjects
                        </Link>
                        <Link 
                            to="/tests" 
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            Tests
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
