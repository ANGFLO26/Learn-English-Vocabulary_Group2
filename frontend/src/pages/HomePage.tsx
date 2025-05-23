import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to Learn English Vocabulary
        </h1>
        <p className="text-lg text-gray-600">
          Improve your English vocabulary with interactive lessons and quizzes
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Choose a Topic</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Topic cards will be rendered here */}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg">Overall Progress</span>
            <span className="text-2xl font-bold text-green-600">65%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{width: '65%'}}></div>
          </div>
        </div>
      </section>

      <section className="text-center">
        <div className="space-x-4">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Start Learning
          </button>
          <button 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Take Quiz
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 