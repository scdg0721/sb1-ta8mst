import React, { useState, useEffect } from 'react';
import { ScrapedData } from '../types';
import { sortData, SortField, SortOrder } from '../utils/sortUtils';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

interface DataDisplayProps {
  data: ScrapedData | null;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data }) => {
  const [sortField, setSortField] = useState<SortField>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [sortOptions, setSortOptions] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.content.length > 0) {
      const headers = data.content[0];
      setSortOptions(headers);
      setSortField(headers[0].toLowerCase());
    }
  }, [data]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl text-gray-500">왼쪽 메뉴에서 데이터를 선택해주세요.</p>
      </div>
    );
  }

  const sortedData = sortData(data, sortField, sortOrder);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = event.target.value.split('-');
    setSortField(field as SortField);
    setSortOrder(order as SortOrder);
  };

  const handleHeaderClick = (field: string) => {
    if (sortField === field.toLowerCase()) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field.toLowerCase());
      setSortOrder('asc');
    }
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field.toLowerCase()) {
      return <ChevronsUpDown size={16} className="ml-1 inline-block text-gray-400" />;
    }
    return sortOrder === 'asc' ? (
      <ChevronUp size={16} className="ml-1 inline-block text-blue-500" />
    ) : (
      <ChevronDown size={16} className="ml-1 inline-block text-blue-500" />
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">{sortedData.header}</h2>
        <div className="relative w-full sm:w-auto">
          <select
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            value={`${sortField}-${sortOrder}`}
            onChange={handleSortChange}
          >
            {sortOptions.map((option) => (
              <React.Fragment key={option}>
                <option value={`${option.toLowerCase()}-asc`}>{option} (오름차순)</option>
                <option value={`${option.toLowerCase()}-desc`}>{option} (내림차순)</option>
              </React.Fragment>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown size={20} />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {sortedData.content[0].map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => handleHeaderClick(header)}
                >
                  <span className="flex items-center">
                    {header}
                    {renderSortIcon(header)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.content.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hover:bg-gray-100 transition-colors duration-200"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataDisplay;