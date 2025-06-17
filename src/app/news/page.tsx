import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const newsItems = [
  {
    source: 'World Economic Forum',
    title: 'AI is Being Deployed to Fight Climate Change in 9 Key Ways',
    quote: 'The company works in industries including insurance, energy, logistics and sport, where its analysis of disaster conditions and factors such as air quality can inform decisions on whether to delay or suspend events.',
    summary: 'The World Economic Forum highlights how artificial intelligence is becoming a critical tool in the fight against climate change. AI is not just a single solution but a versatile technology being applied across multiple sectors—from improving the accuracy of climate models and optimizing energy grids to enhancing the resilience of supply chains and monitoring deforestation in real time. This widespread application demonstrates AI’s potential to drive significant environmental impact.',
    link: 'https://www.weforum.org/stories/2024/02/ai-combat-climate-change/'
  },
  {
    source: 'The New York Times',
    title: 'What Will Power the A.I. Revolution?',
    quote: 'Weather Forecasting and A.I.: A Microsoft A.I. model can make accurate 10-day forecasts quickly, an analysis found. And, it’s designed to predict more than weather.',
    summary: 'While the potential for AI in climate tech is immense, its own environmental footprint is a growing concern. The New York Times explores the significant energy demands of the data centers that power the AI revolution. The article emphasizes the dual nature of AI: it is both a powerful tool for climate solutions and a new, significant source of energy consumption that must be managed responsibly.',
    link: 'https://www.nytimes.com/2025/01/07/climate/artificial-intelligence-power-emissions.html'
  },
  {
    source: 'Axios',
    title: 'Fears of AI Speeding Up Climate Change \"Overstated\"',
    quote: 'Weighing AI\'s electricity thirst against ways it can help cut emissions is a wild card in the global energy and carbon future.',
    summary: 'Providing a counter-perspective, a recent report featured in Axios suggests that concerns about AI\'s negative climate impact may be overstated. The argument is that the efficiency gains and carbon reduction solutions enabled by AI could far outweigh the emissions from its own energy use. This highlights the critical need for a nuanced, data-driven analysis of AI’s net effect on the climate.',
    link: 'https://www.axios.com/2025/04/10/ai-climate-change-report'
  }
];

export default function NewsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <header className="fixed top-0 left-48 right-0 bg-black/50 backdrop-blur-sm z-10">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16 border-b border-gray-800">
            <h1 className="text-xl font-semibold">AI in the Climate Field</h1>
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="inline-block w-4 h-4 mr-1" />
              Back to App
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 max-w-3xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="space-y-12">
          {newsItems.map((item, index) => (
            <article key={index} className="animate-fade-in-delay-1">
              <h2 className="text-2xl font-bold mb-2 text-green-400">{item.title}</h2>
              <p className="text-sm text-gray-400 mb-4">Source: {item.source}</p>
              <p className="text-gray-300 mb-4">{item.summary}</p>
              <blockquote className="border-l-4 border-gray-700 pl-4 italic text-gray-400 mb-4">
                "{item.quote}"
              </blockquote>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-green-500 hover:underline">
                Read full article &rarr;
              </a>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
