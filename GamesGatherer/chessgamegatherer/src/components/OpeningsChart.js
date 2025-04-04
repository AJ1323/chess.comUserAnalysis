import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OpeningsChart = ({ username, openingsData }) => {
  const [sortBy, setSortBy] = useState('total'); // Can sort by total games played using the opening or by winrate
  const [displayCount, setDisplayCount] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOpening, setSelectedOpening] = useState(null);
 

  if (!openingsData || openingsData.size === 0) {
    return <div className="no_data">No openings data available</div>;
  }

  // Convert Map to array format for Recharts
  const chartData = [];
  openingsData.forEach((values, eco) => {
    const wins = values[0];
    const losses = values[1];
    const draws = values[2];
    const total = wins + losses + draws;
    const winRate = total > 0 ? (wins / total * 100).toFixed(1) : 0;
    
    chartData.push({
      eco,
      wins,
      losses,
      draws,
      total,
      winRate: parseFloat(winRate)
    });
  });
  
  // Filter based on search term
  const filteredData = searchTerm 
    ? chartData.filter(item => item.eco.toLowerCase().includes(searchTerm.toLowerCase()))
    : chartData;
  
  // Sort data
  let sortedData = [...filteredData];
  if (sortBy === 'total') {
    sortedData.sort((a, b) => b.total - a.total);
  } else if (sortBy === 'winRate') {
    sortedData.sort((a, b) => b.winRate - a.winRate || b.total - a.total);
  }
  
  // Take top N openings
  const displayData = sortedData.slice(0, displayCount);


  // Handle bar click to select opening
  const handleBarClick = (data) => {
    setSelectedOpening(data.eco);
  };

  

  return (
    <div className="opening_charts_container">
      <h2>Chess Opening Performance for {username}</h2>
      
      <div className="sort_container">
        <div>
          <label className="sort_label">Sort by:</label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort_selection"
          >
            <option value="total">Most Played</option>
            <option value="winRate">Win Rate</option>
          </select>
        </div>
        
        <div>
          <label className="display_selection_container">Display:</label>
          <select 
            value={displayCount}
            onChange={(e) => setDisplayCount(Number(e.target.value))}
            className="count_selection"
          >
            <option value={5}>Top 5</option>
            <option value={10}>Top 10</option>
            <option value={20}>Top 20</option>
            <option value={50}>Top 50</option>
            <option value={100}>Top 100</option>
          </select>
        </div>
        
        <div className="search_bar_container">
          <input
            type="text"
            placeholder="Search openings"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="searchbar"
          />
        </div>
      </div>
      
      <div className="search_total_container">
        <p>Total openings: {chartData.length}</p>
        {searchTerm && <p>Filtered results: {filteredData.length}</p>}
      </div>
      
      <div className="chart_container">
        {/* Chart section */}
        <div className="chart">
          <ResponsiveContainer width="100%" height={Math.max(400, displayData.length * 30)}>
            <BarChart
              data={displayData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
              onClick={(data) => data && data.activePayload && handleBarClick(data.activePayload[0].payload)}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis 
                dataKey="eco" 
                type="category"
                width={60}
                tick={(props) => {
                  const { x, y, payload } = props;
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text 
                        x={-5} 
                        y={0} 
                        dy={4} 
                        textAnchor="end" 
                        fill="#666"
                        onClick={() => setSelectedOpening(payload.value)}
                      >
                        {payload.value.split(' ')[0]} {/* Just show ECO code on axis */}
                      </text>
                    </g>
                  );
                }}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'winRate') return [`${value}%`, 'Win Rate'];
                  return [`${value} games`, name];
                }}
                labelFormatter={(eco) => `Opening: ${eco}`}
              />
              <Legend />
              <Bar dataKey="wins" name="Wins" stackId="a" fill="#4CAF50" />
              <Bar dataKey="losses" name="Losses" stackId="a" fill="#F44336" />
              <Bar dataKey="draws" name="Draws" stackId="a" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Opening details section */}
        <div className="hover_window">
          {selectedOpening ? (
            <div>
              <div>
                <div>{selectedOpening}</div>
                
              </div>
              <div>
                <web 
                  src={selectedOpening}
                  title={`ECO ${selectedOpening}`}
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  loading="lazy"
                />
              </div>
              <div className="display_opening">
                {displayData.find(item => item.eco === selectedOpening) && (
                  <div>
                    <span>Total games: {displayData.find(item => item.eco === selectedOpening).total}</span>
                    <span>Win rate: {displayData.find(item => item.eco === selectedOpening).winRate}%</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>Select an opening to view details</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpeningsChart;