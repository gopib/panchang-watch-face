import React, { useState, useEffect } from 'react';
import { Sun, Moon, Info } from 'lucide-react';
import { getPanchangData } from '../utils/panchangApi';
import MuhurtamDetails from './MuhurtamDetails';

const PanchangWatchFace = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel] = useState(85);
  const [panchangData, setPanchangData] = useState(null);
  const [showMuhurtam, setShowMuhurtam] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchPanchang = async () => {
      const data = await getPanchangData();
      setPanchangData(data);
    };
    
    fetchPanchang();
    const panchangTimer = setInterval(fetchPanchang, 3600000);
    
    return () => clearInterval(panchangTimer);
  }, []);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  if (!panchangData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white">Loading Panchang...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 overflow-auto">
      {/* Watch Container */}
      <div className="relative w-[480px] h-[480px] rounded-full bg-black border-8 border-gray-700 shadow-2xl overflow-hidden">
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-blue-900/20"></div>
        
        {/* Info button for Muhurtam details */}
        <button
          onClick={() => setShowMuhurtam(true)}
          className="absolute top-3 left-3 z-10 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 rounded-full p-1.5 transition-colors"
          title="View Muhurtam Details"
        >
          <Info className="w-3 h-3 text-blue-300" />
        </button>
        
        {/* Status bar */}
        <div className="absolute top-3 left-0 right-0 flex justify-between items-center px-8 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <div className="w-5 h-2 border border-gray-400 rounded-sm relative">
              <div className="absolute left-0 top-0 h-full bg-green-500 rounded-sm" style={{width: `${batteryLevel}%`}}></div>
            </div>
            <span className="text-[10px]">{batteryLevel}%</span>
          </div>
          <div className="flex gap-1">
            <div className="w-1 h-2.5 bg-gray-400 rounded"></div>
            <div className="w-1 h-2.5 bg-gray-400 rounded"></div>
            <div className="w-1 h-2.5 bg-gray-500 rounded"></div>
          </div>
        </div>

        {/* Main time display */}
        <div className="absolute top-10 left-0 right-0 text-center">
          <div className="text-5xl font-bold text-white tracking-tight">
            {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
          </div>
          <div className="text-[10px] text-orange-400 mt-0.5">
            {String(seconds).padStart(2, '0')}
          </div>
        </div>

        {/* Panchang Details */}
        <div className="absolute top-[88px] left-0 right-0 px-8">
          {/* Tithi and Paksha */}
          <div className="bg-gradient-to-r from-orange-500/40 to-orange-700/40 backdrop-blur-sm rounded-lg p-2.5 mb-1.5 border border-orange-400/50 min-h-[40px] flex items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Moon className="w-3.5 h-3.5 text-orange-200" />
                <span className="text-[11px] text-orange-100 font-semibold">Tithi</span>
              </div>
              <span className="text-[11px] text-white font-medium">{panchangData.tithi} ({panchangData.paksha})</span>
            </div>
          </div>

          {/* Nakshatra */}
          <div className="bg-gradient-to-r from-blue-500/40 to-blue-700/40 backdrop-blur-sm rounded-lg p-2.5 mb-1.5 border border-blue-400/50 min-h-[40px] flex items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Sun className="w-3.5 h-3.5 text-blue-200" />
                <span className="text-[11px] text-blue-100 font-semibold">Nakshatra</span>
              </div>
              <span className="text-[11px] text-white font-medium">{panchangData.nakshatra}</span>
            </div>
          </div>

          {/* Ayana & Rashi */}
          <div className="grid grid-cols-2 gap-2 mb-1.5">
            <div className="bg-purple-500/40 backdrop-blur-sm rounded-lg p-2.5 border border-purple-400/50 min-h-[40px] flex items-center">
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] text-purple-100 font-semibold">Ayana</span>
                <span className="text-[11px] text-white font-medium">{panchangData.ayana}</span>
              </div>
            </div>
            <div className="bg-purple-500/40 backdrop-blur-sm rounded-lg p-2.5 border border-purple-400/50 min-h-[40px] flex items-center">
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] text-purple-100 font-semibold">Rashi</span>
                <span className="text-[11px] text-white font-medium">{panchangData.rashi}</span>
              </div>
            </div>
          </div>

          {/* Ritu */}
          <div className="bg-pink-500/40 backdrop-blur-sm rounded-lg p-2.5 mb-1.5 border border-pink-400/50 min-h-[40px] flex items-center">
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] text-pink-100 font-semibold">Ritu</span>
              <span className="text-[11px] text-white font-medium">{panchangData.ritu}</span>
            </div>
          </div>

          {/* Chandrodaya & Chandrastama (Moonrise & Moonset) */}
          <div className="bg-gradient-to-r from-indigo-500/40 to-purple-600/40 backdrop-blur-sm rounded-lg p-2.5 mb-1.5 border border-indigo-400/50 min-h-[40px] flex items-center">
            <div className="flex items-center justify-between text-[11px] w-full">
              <div className="flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-indigo-200" />
                <span className="text-indigo-100 font-medium">{panchangData.moonrise}</span>
              </div>
              <div className="text-gray-300">↑↓</div>
              <div className="flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-purple-200" />
                <span className="text-purple-100 font-medium">{panchangData.moonset}</span>
              </div>
            </div>
          </div>

          {/* Sunrise & Sunset */}
          <div className="bg-gradient-to-r from-yellow-500/40 to-red-500/40 backdrop-blur-sm rounded-lg p-2.5 border border-yellow-400/50 min-h-[40px] flex items-center">
            <div className="flex items-center justify-between text-[11px] w-full">
              <div className="flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-yellow-200" />
                <span className="text-yellow-100 font-medium">{panchangData.sunrise}</span>
              </div>
              <div className="text-gray-300">|</div>
              <div className="flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-orange-200" />
                <span className="text-orange-100 font-medium">{panchangData.sunset}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <div className="text-[10px] text-gray-400">
            {panchangData.teluguMonth} • Samvat {panchangData.samvat}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 30}deg) translateY(-230px)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Muhurtam Details Modal */}
      {showMuhurtam && (
        <MuhurtamDetails 
          panchangData={panchangData} 
          onClose={() => setShowMuhurtam(false)} 
        />
      )}
    </div>
  );
};

export default PanchangWatchFace;
