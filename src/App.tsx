import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Navigation from './components/Navigation';
import DataDisplay from './components/DataDisplay';
import { ScrapedData } from './types';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<ScrapedData | null>(null);
  const [scrapedData, setScrapedData] = useState<ScrapedData[]>([]);

  useEffect(() => {
    // Python 스크립트에서 생성한 JSON 파일을 불러옵니다.
    fetch('/scraped_data.json')
      .then(response => response.json())
      .then(data => setScrapedData(data))
      .catch(error => console.error('Error fetching scraped data:', error));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <button
        className="fixed top-4 left-4 z-20 lg:hidden"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        {isNavOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <Navigation
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        data={scrapedData}
        onSelectData={setSelectedData}
      />

      <main className="flex-1 p-5 lg:ml-64 overflow-auto">
        <DataDisplay data={selectedData} />
      </main>
    </div>
  );
}

export default App;