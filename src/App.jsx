import { useState, useEffect } from 'react';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Simulated Stadium Load Times (Waiting minutes)
  const [gateEntryWait, setGateEntryWait] = useState(8);
  const [fanZoneWait, setFanZoneWait] = useState(15);
  const [washroomWait, setWashroomWait] = useState(3);
  const [foodPlazaWait, setFoodPlazaWait] = useState(12);

  const matches = [
    { teams: 'MI vs CSK', time: '7:30 PM', status: 'Live', venue: 'Wankhede Stadium', isLive: true },
    { teams: 'RCB vs KKR', time: 'Tomorrow', status: 'Upcoming', venue: 'M. Chinnaswamy Stadium' },
    { teams: 'RR vs SRH', time: 'Ended', status: 'RR won by 15 runs', venue: 'Sawai Mansingh Stadium' },
  ];

  useEffect(() => {
    // Clock Simulator
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Dynamic Crowd Load Simulator
    const dataTimer = setInterval(() => {
      // Fluctuate gate entry wait time between 5 and 20 mins
      setGateEntryWait(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(5, Math.min(25, prev + change));
      });

      // Fluctuate fan zone wait time between 10 and 40 mins
      setFanZoneWait(prev => {
        const change = Math.floor(Math.random() * 7) - 3;
        return Math.max(10, Math.min(45, prev + change));
      });

      // Fluctuate washroom wait time between 1 and 8 mins
      setWashroomWait(prev => {
        const change = Math.floor(Math.random() * 3) - 1;
        return Math.max(1, Math.min(8, prev + change));
      });

      // Fluctuate food plaza wait time between 5 and 25 mins
      setFoodPlazaWait(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(5, Math.min(25, prev + change));
      });
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(dataTimer);
    };
  }, []);

  const getStatusColor = (wait) => {
    if (wait <= 10) return 'status-low';
    if (wait <= 25) return 'status-medium';
    return 'status-high';
  };

  const getStatusText = (wait) => {
    if (wait <= 10) return 'Smooth';
    if (wait <= 25) return 'Busy';
    return 'Congested';
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Mivora IPL Live
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div className="live-badge">
            <div className="pulse-dot"></div>
            Stadium Live
          </div>
          <div className="current-time">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        </div>
      </header>

      <main className="grid">
        <section className="card">
          <h2 className="card-title">
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            Tonight's Clashes
          </h2>
          <div className="schedule-list">
            {matches.map((match, index) => (
              <div key={index} className={`movie-item ${match.isLive ? 'now-showing' : ''}`}>
                <div className="movie-time">{match.time}</div>
                <div className="movie-details">
                  <h3>{match.teams}</h3>
                  <p>{match.venue} • {match.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 className="card-title">
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Stadium Pulse
          </h2>
          <div className="wait-times-grid">
            
            <div className={`wait-time-panel ${getStatusColor(gateEntryWait)}`}>
              <div className="wait-time-top">
                <div className="wait-time-info">
                  <h3>Gate Entry</h3>
                  <p>All General Stands</p>
                </div>
                <div className="wait-time-status">
                  <div className="wait-time-number">
                    {gateEntryWait} <span>min</span>
                  </div>
                </div>
              </div>
              <div className="status-badge">
                {getStatusText(gateEntryWait)}
              </div>
            </div>

            <div className={`wait-time-panel ${getStatusColor(fanZoneWait)}`}>
              <div className="wait-time-top">
                <div className="wait-time-info">
                  <h3>Fan Zone Plaza</h3>
                  <p>Main Concourse Food Hub</p>
                </div>
                <div className="wait-time-status">
                  <div className="wait-time-number">
                    {fanZoneWait} <span>min</span>
                  </div>
                </div>
              </div>
              <div className="status-badge">
                {getStatusText(fanZoneWait)}
              </div>
            </div>

            <div className={`wait-time-panel ${getStatusColor(washroomWait)}`}>
              <div className="wait-time-top">
                <div className="wait-time-info">
                  <h3>Stadium Washrooms</h3>
                  <p>North & South Concourse</p>
                </div>
                <div className="wait-time-status">
                  <div className="wait-time-number">
                    {washroomWait} <span>min</span>
                  </div>
                </div>
              </div>
              <div className="status-badge">
                {getStatusText(washroomWait)}
              </div>
            </div>

            <div className={`wait-time-panel ${getStatusColor(foodPlazaWait)}`}>
              <div className="wait-time-top">
                <div className="wait-time-info">
                  <h3>Food & Beverages</h3>
                  <p>Premium Outlets</p>
                </div>
                <div className="wait-time-status">
                  <div className="wait-time-number">
                    {foodPlazaWait} <span>min</span>
                  </div>
                </div>
              </div>
              <div className="status-badge">
                {getStatusText(foodPlazaWait)}
              </div>
            </div>

          </div>
        </section>
      </main>

      <footer className="creator-banner">
        <div className="banner-content">
          <div className="banner-title">Utkarsh Dashora</div>
          <div className="banner-subtitle">Elevating Fan Experience</div>
          
          <div className="social-links">
            <a href="https://instagram.com/utkarshDashora" target="_blank" rel="noopener noreferrer" className="social-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
              utkarshDashora
            </a>
            <a href="https://twitter.com/utkarshDashora" target="_blank" rel="noopener noreferrer" className="social-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
              @utkarshDashora
            </a>
            <a href="https://linkedin.com/in/utkarsh-dashora" target="_blank" rel="noopener noreferrer" className="social-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" strokeWidth="2"></circle></svg>
              utkarsh-dashora
            </a>
          </div>
        </div>
        <div className="banner-graphic">
          <div className="built-by-badge">Built by Utkarsh Dashora</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
