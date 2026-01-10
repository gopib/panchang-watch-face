import React from 'react';
import { X, AlertTriangle, Sparkles } from 'lucide-react';

const MuhurtamDetails = ({ panchangData, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-auto">
      <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 rounded-2xl max-w-md w-full p-6 relative my-8 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-white mb-4 pr-8">Muhurtam Details</h2>

        {/* Inauspicious Times */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-semibold text-red-400">Inauspicious Times</h3>
          </div>

          {/* Rahu Kalam */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-2">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs text-red-300 font-semibold">Rahu Kalam</div>
                <div className="text-[10px] text-gray-400 mt-0.5">రాహు కాలం</div>
              </div>
              <div className="text-sm text-white font-mono">{panchangData.rahuKalam}</div>
            </div>
          </div>

          {/* Yama Gandam */}
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-3 mb-2">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs text-orange-300 font-semibold">Yama Gandam</div>
                <div className="text-[10px] text-gray-400 mt-0.5">యమ గండం</div>
              </div>
              <div className="text-sm text-white font-mono">{panchangData.yamaGandam}</div>
            </div>
          </div>

          {/* Durmuhurtam */}
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs text-yellow-300 font-semibold">Durmuhurtam</div>
                <div className="text-[10px] text-gray-400 mt-0.5">దుర్ముహూర్తం</div>
              </div>
              <div className="text-sm text-white font-mono">{panchangData.durmuhurtam}</div>
            </div>
          </div>
        </div>

        {/* Auspicious Times */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-green-400" />
            <h3 className="text-sm font-semibold text-green-400">Shubha Muhurtam</h3>
          </div>

          {/* Brahma Muhurtam */}
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 mb-2">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs text-green-300 font-semibold">Brahma Muhurtam</div>
                <div className="text-[10px] text-gray-400 mt-0.5">బ్రహ్మ మహూర్తం</div>
              </div>
              <div className="text-sm text-white font-mono">{panchangData.brahmaMuhurtam}</div>
            </div>
          </div>

          {/* Abhijit Muhurtam */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs text-blue-300 font-semibold">Abhijit Muhurtam</div>
                <div className="text-[10px] text-gray-400 mt-0.5">అభిజిత్ ముహూర్తం</div>
              </div>
              <div className="text-sm text-white font-mono">{panchangData.abhijitMuhurtam}</div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
          <p className="text-[10px] text-gray-400 text-center">
            Avoid starting important activities during inauspicious times. 
            Brahma Muhurtam is ideal for spiritual practices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MuhurtamDetails;
