export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Kundan Kishore | <a href="https://www.kundankishore.in" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">kundankishore.in</a></p>
      </div>
    </footer>
  );
}
