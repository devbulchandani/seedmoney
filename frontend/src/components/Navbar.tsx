import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50">
            {/* Top Header Bar */}
            <div className="bg-[#0d4d6b] text-white px-6 py-2 text-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>{new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-4 group">
                            <div className="w-12 h-12 bg-[#0d4d6b] rounded-lg flex items-center justify-center shadow-md group-hover:bg-[#0a3d54] transition-colors">
                                <GraduationCap className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-[#0d4d6b]">
                                    Academic Labs
                                </h1>
                                <p className="text-xs text-gray-600">An Initiative of <span className="font-semibold">Poornima University</span></p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="bg-[#0d4d6b] shadow-md">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-1">
                        <Link 
                            to="/" 
                            className="px-6 py-3 text-white hover:bg-[#0a3d54] font-medium transition-colors border-r border-[#1a5f7f]"
                        >
                            HOME
                        </Link>
                        <Link 
                            to="/" 
                            className="px-6 py-3 text-white hover:bg-[#0a3d54] font-medium transition-colors border-r border-[#1a5f7f]"
                        >
                            SUBJECTS
                        </Link>
                        <Link 
                            to="/tests" 
                            className="px-6 py-3 text-white hover:bg-[#0a3d54] font-medium transition-colors"
                        >
                            TESTS
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
