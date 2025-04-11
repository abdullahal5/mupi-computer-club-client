const Projects = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
      <p className="text-gray-600 mb-6 text-center">
        We're working on something amazing. Stay tuned!
      </p>
      <button
        className="px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition-all"
        onClick={() => (window.location.href = "/")}
      >
        Go Home
      </button>
    </div>
  );
};

export default Projects;
