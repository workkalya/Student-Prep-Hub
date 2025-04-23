
function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 blue-theme:from-blue-800 blue-theme:to-blue-900 green-theme:from-green-600 green-theme:to-teal-600 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()} Student Prep Hub. All rights reserved.
        </p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition">
            GitHub
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition">
            Twitter
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition">
            Facebook
          </a>
        </div>
        <p className="mt-2 text-sm sm:text-base">Made with ❤️ by Abdullah Habib</p>
      </div>
    </footer>
  );
}

export default Footer;
