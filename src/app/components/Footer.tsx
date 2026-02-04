import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#D2D2C2] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - STAMPD */}
          <div>
            <h3 className="text-1xl md:text-2xl font-bold uppercase tracking-[0.2em] text-[#947D1E] mb-10">
          BORDERLESS IDENTITY
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/about" 
                className="text-xs tracking-[0.15em] text-gray-700 hover:text-gray-900 transition-colors"
              >
                ABOUT
              </Link>
              <Link 
                href="/contact" 
                className="text-xs tracking-[0.15em] text-gray-700 hover:text-gray-900 transition-colors"
              >
                CONTACT
              </Link>
            
              <Link 
                href="/accessibility" 
                className="text-xs tracking-[0.15em] text-gray-700 hover:text-gray-900 transition-colors"
              >
                ACCESSIBILITY
              </Link>
              <Link 
                href="/login" 
                className="text-xs tracking-[0.15em] text-gray-700 hover:text-gray-900 transition-colors"
              >
                LOGIN
              </Link>
              <Link 
                href="/work-with-us" 
                className="text-xs tracking-[0.15em] text-gray-700 hover:text-gray-900 transition-colors"
              >
                WORK WITH US
              </Link>
            </nav>
          </div>

          {/* Right Column - CONNECT */}
          <div>
            <h3 className="text-1xl md:text-2xl font-bold uppercase tracking-[0.2em] text-gray-900 mb-6 mt-2">
              CONNECT
            </h3>
            <nav className="flex flex-col space-y-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs tracking-[0.15em] text-gray-700 hover:text-gray-900 transition-colors"
              >
                INSTAGRAM
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs tracking-[0.15em] text-gray-700 hover:text-gray-900 transition-colors"
              >
                FACEBOOK
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs tracking-[0.15em] text-gray-700 hover:text-gray-900 transition-colors"
              >
                TWITTER
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs tracking-[0.15em] text-gray-700 hover:text-gray-900 transition-colors"
              >
                PINTEREST
              </a>
            </nav>
          </div>
          
          
        </div>
      </div>
      
    </footer>
  );
}