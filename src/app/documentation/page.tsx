import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DocumentationPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <header className="fixed top-0 left-48 right-0 bg-black/50 backdrop-blur-sm z-10">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16 border-b border-gray-800">
            <h1 className="text-xl font-semibold">Climate Intelligence, Reimagined.</h1>
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="inline-block w-4 h-4 mr-1" />
              Back to App
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 max-w-3xl mx-auto px-6 sm:px-8 lg:px-10">
        <section className="mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">The Intelligent Data Foundation</h2>
          <p className="text-lg text-gray-400">
            Our climate conversational agent isn't just another chatbot. It's a sophisticated analytical tool built on a revolutionary foundation: <span className="text-white font-medium">MongoDB Atlas</span>. While Google's Gemini AI provides the conversational interface, MongoDB is the intelligent backbone that makes true understanding possible.
          </p>
        </section>

        <section className="mb-16 animate-fade-in-delay-1">
          <h3 className="text-2xl font-bold mb-4">Beyond Storage: Understanding with Vector Search</h3>
          <p className="text-gray-400 mb-4">
            We don't just store data; we comprehend it. By leveraging <span className="text-white font-medium">MongoDB's powerful Vector Search</span>, we transform raw climate statistics into a rich, searchable tapestry of interconnected insights. When you ask a question, you're not just querying a database—you're tapping into a system that understands the semantic meaning behind your words.
          </p>
          <p className="text-gray-400">
            This allows us to deliver answers with unprecedented context. We can instantly find historical precedents, identify subtle trends, and provide comparisons that would be impossible with traditional databases. MongoDB is what turns a simple weather query into a deep climate insight.
          </p>
        </section>

        <section className="mb-16 animate-fade-in-delay-2">
          <h3 className="text-2xl font-bold mb-4">The Architecture of Insight</h3>
          <div className="border-l-2 border-green-500 pl-6 space-y-8">
            <div>
              <h4 className="font-semibold text-green-400">1. Conversational Interface (Google Gemini)</h4>
              <p className="text-gray-400">Your natural language query is understood and deconstructed by Google's advanced AI.</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-400">2. Deep Contextual Search (MongoDB Atlas)</h4>
              <p className="text-gray-400">The query is converted into a vector and sent to MongoDB, which performs a high-speed search across billions of data points to find the most semantically relevant historical and live information.</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-400">3. Synthesized Response</h4>
              <p className="text-gray-400">The live data and the rich context from MongoDB are synthesized by Gemini into a single, clear, and insightful answer.</p>
            </div>
          </div>
        </section>

        <section className="animate-fade-in-delay-3">
           <h3 className="text-2xl font-bold mb-4">Scalability and Speed</h3>
           <p className="text-gray-400">
            Built on the globally distributed and highly scalable infrastructure of MongoDB Atlas, our platform is ready for planetary-scale data challenges. It ensures that no matter how complex the query, your answers are delivered in an instant.
           </p>
        </section>
      </main>
    </div>
  );
}
