export default function Hero() {
  return (
    <div className="text-center lg:text-left">
      <div className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
        By Kundan Kishore | BITS Pilani | Ex-Morgan Stanley
      </div>
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
        6-Month Mentorship on{' '}
        <span className="text-primary-600">Options Trading</span>
      </h1>
      <p className="text-lg text-gray-600 mb-6 max-w-lg">
        A structured, market-neutral approach to options trading. No tips, no predictions
        — just logic, discipline, and a proven process. Trusted by 1,400+ mentees.
      </p>
      <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Market-Neutral Strategies</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Learn → Test → Then Trade</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>1-Week Refund Policy</span>
        </div>
      </div>

      {/* Social proof */}
      <div className="flex items-center gap-4 justify-center lg:justify-start">
        <div className="flex -space-x-2">
          {['bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-pink-400'].map((color, i) => (
            <div key={i} className={`w-8 h-8 rounded-full ${color} border-2 border-white`} />
          ))}
        </div>
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-700">1,400+</span> mentees trained
        </p>
      </div>
    </div>
  );
}
