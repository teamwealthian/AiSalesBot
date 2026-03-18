export default function Hero() {
  return (
    <div className="text-center lg:text-left">
      <div className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
        AI-Powered Sales Assistant
      </div>
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
        Close More Deals,{' '}
        <span className="text-primary-600">Effortlessly</span>
      </h1>
      <p className="text-lg text-gray-600 mb-6 max-w-lg">
        Our AI sales assistant engages your prospects 24/7, handles objections like a pro, and
        guides them toward purchase — so you never miss a sale.
      </p>
      <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>24/7 Availability</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Smart Objection Handling</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Proven Closure Tactics</span>
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
          <span className="font-semibold text-gray-700">500+</span> businesses trust us
        </p>
      </div>
    </div>
  );
}
