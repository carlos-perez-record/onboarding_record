// Tailwind CSS Configuration for Onboarding Record
// Version: 2.0 - Post-migration to utility-first approach

module.exports = {
  // Specify content sources for Tailwind to scan
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/assets/stylesheets/**/*.css',
  ],
  
  theme: {
    extend: {
      // ========================================
      // CORPORATE COLORS
      // ========================================
      colors: {
        // Primary Brand Color (Blue)
        primary: {
          DEFAULT: '#0056b3',  // Main brand blue
          dark: '#003d82',     // Darker shade for hover states
          light: '#4a90e2',    // Lighter shade for backgrounds
          50: '#e6f0ff',       // Lightest tint
          100: '#cce1ff',
          200: '#99c3ff',
          300: '#66a6ff',
          400: '#3388ff',
          500: '#0056b3',      // DEFAULT
          600: '#004a99',
          700: '#003d82',
          800: '#003066',
          900: '#00244d',
        },
        
        // Success Color (Green)
        success: {
          DEFAULT: '#28a745',
          dark: '#1e7e34',
          light: '#5cb85c',
          50: '#e8f5e9',
          500: '#28a745',
          700: '#1e7e34',
        },
        
        // Danger Color (Red)
        danger: {
          DEFAULT: '#dc3545',
          dark: '#c82333',
          light: '#f56c6c',
          50: '#fdeaec',
          500: '#dc3545',
          700: '#c82333',
        },
        
        // Warning Color (Yellow)
        warning: {
          DEFAULT: '#ffc107',
          dark: '#e0a800',
          light: '#ffd54f',
          50: '#fff9e5',
          500: '#ffc107',
          700: '#e0a800',
        },
        
        // Secondary/Neutral Color (Gray)
        secondary: {
          DEFAULT: '#6c757d',
          dark: '#545b62',
          light: '#a8aeb4',
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#545b62',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
        
        // Role-based Colors
        admin: {
          bg: '#d1ecf1',       // Light blue background
          text: '#0c5460',     // Dark blue text
          border: '#bee5eb',   // Border color
        },
        
        recruiter: {
          bg: '#e2d5f0',       // Light purple background
          text: '#522b5d',     // Dark purple text
          border: '#d4bfe8',   // Border color
        },
        
        // UI Colors
        navbar: {
          DEFAULT: '#f5f5f5',
          hover: '#e8e8e8',
        },
        
        sidebar: {
          DEFAULT: '#f9f9f9',
          hover: '#f0f0f0',
        },
      },
      
      // ========================================
      // TYPOGRAPHY
      // ========================================
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
      },
      
      fontSize: {
        // Custom sizes if needed beyond Tailwind defaults
        'heading-1': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-2': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-3': ['1.75rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-4': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-5': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-base': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
      },
      
      // ========================================
      // SPACING
      // ========================================
      spacing: {
        // Custom spacing if needed
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        '128': '32rem',   // 512px
      },
      
      // ========================================
      // SHADOWS
      // ========================================
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'navbar': '0 2px 4px rgba(0, 0, 0, 0.05)',
      },
      
      // ========================================
      // BORDER RADIUS
      // ========================================
      borderRadius: {
        'card': '0.5rem',
        'button': '0.375rem',
      },
      
      // ========================================
      // TRANSITIONS
      // ========================================
      transitionDuration: {
        '250': '250ms',
      },
      
      // ========================================
      // Z-INDEX
      // ========================================
      zIndex: {
        'navbar': '1000',
        'sidebar': '900',
        'modal': '1100',
        'dropdown': '1050',
      },
    },
  },
  
  // ========================================
  // PLUGINS
  // ========================================
  plugins: [
    // Add plugins here if needed
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
}
