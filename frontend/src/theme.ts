// Global Theme Configuration for Poornima University Academic Labs

export const theme = {
    colors: {
        // Primary Colors
        primary: '#0d4d6b',        // Dark teal - main brand color
        primaryHover: '#0a3d54',   // Darker teal for hover states
        primaryLight: '#1a5f7f',   // Light teal for borders

        // Secondary Colors
        secondary: '#2196F3',      // Blue for title bars
        link: '#2874A6',           // Blue for links
        linkHover: '#1f5a85',      // Darker blue for link hover

        // Neutral Colors
        gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
        },

        // Sidebar
        sidebar: '#5a5a5a',

        // Status Colors
        success: '#10b981',
        successLight: '#d1fae5',
        warning: '#f59e0b',
        warningLight: '#fef3c7',
        error: '#ef4444',
        errorLight: '#fee2e2',
        info: '#3b82f6',
        infoLight: '#dbeafe',

        // Difficulty Colors
        difficulty: {
            easy: {
                bg: '#dcfce7',
                text: '#16a34a',
            },
            medium: {
                bg: '#fef3c7',
                text: '#ca8a04',
            },
            hard: {
                bg: '#fee2e2',
                text: '#dc2626',
            },
        },
    },

    // Border Radius
    borderRadius: {
        none: '0',
        sm: '0.125rem',    // 2px - for cards and buttons
        md: '0.25rem',     // 4px
        lg: '0.5rem',      // 8px - for larger elements
    },

    // Shadows
    shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    },

    // Typography
    fonts: {
        sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        mono: '"Courier New", Courier, monospace',
    },

    // Spacing
    spacing: {
        xs: '0.5rem',   // 8px
        sm: '0.75rem',  // 12px
        md: '1rem',     // 16px
        lg: '1.5rem',   // 24px
        xl: '2rem',     // 32px
    },
};

// CSS Classes for common patterns
export const themeClasses = {
    // Buttons
    button: {
        primary: 'bg-[#0d4d6b] hover:bg-[#0a3d54] text-white font-medium transition-colors',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-colors',
        success: 'bg-green-600 hover:bg-green-700 text-white font-medium transition-colors',
        danger: 'bg-red-600 hover:bg-red-700 text-white font-medium transition-colors',
    },

    // Cards
    card: 'bg-white border border-gray-200 rounded-sm shadow-sm',
    cardHover: 'bg-white border border-gray-200 rounded-sm shadow-sm hover:bg-gray-50 transition-colors',

    // Links
    link: 'text-[#2874A6] hover:underline',

    // Title Bar
    titleBar: 'bg-[#2196F3] text-white px-6 py-3 rounded-sm',

    // Sidebar
    sidebar: 'bg-[#5a5a5a] text-white p-4 rounded-sm',

    // Tabs
    tab: {
        active: 'bg-[#0d4d6b] text-white',
        inactive: 'text-gray-700 hover:bg-gray-50',
    },

    // Input
    input: 'border border-gray-300 rounded focus:ring-1 focus:ring-[#2874A6] focus:border-[#2874A6] outline-none',

    // Badges
    badge: {
        easy: 'text-green-600 bg-green-50 px-2 py-0.5 text-xs font-medium rounded',
        medium: 'text-yellow-600 bg-yellow-50 px-2 py-0.5 text-xs font-medium rounded',
        hard: 'text-red-600 bg-red-50 px-2 py-0.5 text-xs font-medium rounded',
        info: 'text-blue-600 bg-blue-50 px-2 py-0.5 text-xs font-medium rounded',
    },
};

export default theme;
