import React from 'react';
import { ScrapedData } from '../types';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
  data: ScrapedData[];
  onSelectData: (data: ScrapedData) => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose, data, onSelectData }) => {
  return (
    <nav
      className={`fixed top-0 left-0 bottom-0 z-10 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-5">스크랩 데이터</h2>
        <ul>
          {data.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => {
                  onSelectData(item);
                  onClose();
                }}
                className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 transition-colors"
              >
                {item.header}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;