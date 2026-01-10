import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { getPanchangData } from '../utils/panchangApi';

const PanchangWatchFace = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel] = useState(85);
  const [panchangData, setPanchangData] = useState(null);

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
      <div className="relative w-[480px] min-h-[480px] rounded-3xl bg-black border-8 border-gray-700 shadow-2xl overflow-y-auto overflow-x-hidden" style={{maxHeight: '90vh'}}>
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-blue-900/20"></div>
        
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

        {/* Muhurtam Details Section - Scrollable */}
        <div className="absolute top-[370px] left-0 right-0 px-8 pb-6">
          <div className="text-center mb-3">
            <h3 className="text-sm font-bold text-orange-300 mb-1">Muhurtam Details</h3>
            <div className="text-[9px] text-gray-500">Scroll down for all details ↓</div>
          </div>

          {/* Inauspicious Times */}
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-red-400 mb-2 flex items-center gap-1">
              <span>⚠️</span> Inauspicious Times
            </h4>

            {/* Rahu Kalam */}
            <div className="bg-red-900/30 border border-red-500/40 rounded-lg p-2.5 mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[10px] text-red-300 font-semibold">Rahu Kalam</div>
                  <div className="text-[9px] text-gray-400">రాహు కాలం</div>
                </div>
                <div className="text-[11px] text-white font-mono">{panchangData.rahuKalam}</div>
              </div>
            </div>

            {/* Yama Gandam */}
            <div className="bg-orange-900/30 border border-orange-500/40 rounded-lg p-2.5 mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[10px] text-orange-300 font-semibold">Yama Gandam</div>
                  <div className="text-[9px] text-gray-400">యమ గండం</div>
                </div>
                <div className="text-[11px] text-white font-mono">{panchangData.yamaGandam}</div>
              </div>
            </div>

            {/* Durmuhurtam */}
            <div className="bg-yellow-900/30 border border-yellow-500/40 rounded-lg p-2.5">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[10px] text-yellow-300 font-semibold">Durmuhurtam</div>
                  <div className="text-[9px] text-gray-400">దుర్ముహూర్తం</div>
                </div>
                <div className="text-[11px] text-white font-mono">{panchangData.durmuhurtam}</div>
              </div>
            </div>
          </div>

          {/* Auspicious Times */}
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-green-400 mb-2 flex items-center gap-1">
              <span>✨</span> Shubha Muhurtamulu
            </h4>

            {/* Brahma Muhurtam */}
            <div className="bg-green-900/30 border border-green-500/40 rounded-lg p-2.5 mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[10px] text-green-300 font-semibold">Brahma Muhurtam</div>
                  <div className="text-[9px] text-gray-400">బ్రహ్మ మహూర్తం</div>
                </div>
                <div className="text-[11px] text-white font-mono">{panchangData.brahmaMuhurtam}</div>
              </div>
            </div>

            {/* Abhijit Muhurtam */}
            <div className="bg-blue-900/30 border border-blue-500/40 rounded-lg p-2.5 mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[10px] text-blue-300 font-semibold">Abhijit Muhurtam</div>
                  <div className="text-[9px] text-gray-400">అభిజిత్ ముహూర్తం</div>
                </div>
                <div className="text-[11px] text-white font-mono">{panchangData.abhijitMuhurtam}</div>
              </div>
            </div>

            {/* Vijaya Muhurtam */}
            <div className="bg-emerald-900/30 border border-emerald-500/40 rounded-lg p-2.5 mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[10px] text-emerald-300 font-semibold">Vijaya Muhurtam</div>
                  <div className="text-[9px] text-gray-400">విజయ ముహూర్తం</div>
                </div>
                <div className="text-[11px] text-white font-mono">{panchangData.vijayaMuhurtam}</div>
              </div>
            </div>

            {/* Godhuli Muhurtam */}
            <div className="bg-amber-900/30 border border-amber-500/40 rounded-lg p-2.5">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[10px] text-amber-300 font-semibold">Godhuli Muhurtam</div>
                  <div className="text-[9px] text-gray-400">గోధూళి ముహూర్తం</div>
                </div>
                <div className="text-[11px] text-white font-mono">{panchangData.godhuliMuhurtam}</div>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-600/30">
            <p className="text-[9px] text-gray-400 text-center leading-relaxed">
              ⚠️ Avoid starting important activities during inauspicious times.<br/>
              ✨ Brahma Muhurtam is ideal for spiritual practices & meditation.
            </p>
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
    </div>
  );
};

export default PanchangWatchFace;
