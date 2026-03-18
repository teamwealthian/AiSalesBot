export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">KK</span>
          </div>
          <span className="font-bold text-gray-900 text-lg">Kundan Kishore</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
          <a href="https://www.kundankishore.in/courses/six-month-options-trading-mentorship" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">Program Details</a>
          <a href="https://www.youtube.com/@KundanKishore" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">YouTube</a>
          <a href="https://www.kundankishore.in/courses/six-month-options-trading-mentorship" target="_blank" rel="noopener noreferrer" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
            Enroll Now
          </a>
        </nav>
      </div>
    </header>
  );
}
