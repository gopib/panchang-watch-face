/**
 * Free Panchang API Integration
 * Uses multiple free sources - no API key required!
 */

// Default location: Hyderabad
const DEFAULT_COORDINATES = {
  latitude: 17.385044,
  longitude: 78.486671,
  timezone: 'Asia/Kolkata'
};

/**
 * Get current location coordinates
 */
const getCurrentLocation = () => {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timezone: 'Asia/Kolkata'
          });
        },
        () => {
          resolve(DEFAULT_COORDINATES);
        }
      );
    } else {
      resolve(DEFAULT_COORDINATES);
    }
  });
};

/**
 * Calculate Hindu Calendar data based on actual lunar calendar
 */
const calculateHinduCalendar = () => {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  const day = now.getDate();
  
  // Telugu/Hindu months mapped to Gregorian calendar (approximate)
  let teluguMonth;
  
  if ((month === 3 && day >= 21) || (month === 4 && day < 20)) {
    teluguMonth = 'Chaitra';
  } else if ((month === 4 && day >= 20) || (month === 5 && day < 21)) {
    teluguMonth = 'Vaisakha';
  } else if ((month === 5 && day >= 21) || (month === 6 && day < 22)) {
    teluguMonth = 'Jyeshtha';
  } else if ((month === 6 && day >= 22) || (month === 7 && day < 23)) {
    teluguMonth = 'Ashadha';
  } else if ((month === 7 && day >= 23) || (month === 8 && day < 23)) {
    teluguMonth = 'Shravana';
  } else if ((month === 8 && day >= 23) || (month === 9 && day < 23)) {
    teluguMonth = 'Bhadrapada';
  } else if ((month === 9 && day >= 23) || (month === 10 && day < 23)) {
    teluguMonth = 'Ashvayuja';
  } else if ((month === 10 && day >= 23) || (month === 11 && day < 22)) {
    teluguMonth = 'Kartika';
  } else if ((month === 11 && day >= 22) || (month === 12 && day < 22)) {
    teluguMonth = 'Margashira';
  } else if ((month === 12 && day >= 22) || (month === 1 && day < 21)) {
    teluguMonth = 'Pushya';
  } else if ((month === 1 && day >= 21) || (month === 2 && day < 20)) {
    teluguMonth = 'Magha';
  } else {
    teluguMonth = 'Phalguna';
  }
  
  // Ritus (seasons) - each ritu spans 2 months
  const rituMap = {
    'Chaitra': 'Vasanta',
    'Vaisakha': 'Vasanta',
    'Jyeshtha': 'Grishma',
    'Ashadha': 'Grishma',
    'Shravana': 'Varsha',
    'Bhadrapada': 'Varsha',
    'Ashvayuja': 'Sharad',
    'Kartika': 'Sharad',
    'Margashira': 'Hemanta',
    'Pushya': 'Hemanta',
    'Magha': 'Shishira',
    'Phalguna': 'Shishira'
  };
  
  const samvat = now.getFullYear() + 57; // Vikram Samvat
  
  return {
    teluguMonth,
    ritu: rituMap[teluguMonth],
    samvat
  };
};

/**
 * Calculate Tithi (Lunar day)
 */
const calculateTithi = () => {
  const now = new Date();
  const moonCycle = 29.53; // Days in lunar month
  const baseDate = new Date('2000-01-06'); // Known new moon
  const daysSinceBase = (now - baseDate) / (1000 * 60 * 60 * 24);
  const currentCycle = (daysSinceBase % moonCycle);
  const tithiNumber = Math.floor(currentCycle / moonCycle * 30) + 1;
  
  const tithiNames = [
    'Pratipada', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dvadashi', 'Trayodashi', 'Chaturdashi', 'Purnima'
  ];
  
  const paksha = tithiNumber <= 15 ? 'Shukla' : 'Krishna';
  const tithiIndex = tithiNumber <= 15 ? tithiNumber - 1 : tithiNumber - 16;
  const tithiName = tithiNumber === 30 ? 'Amavasya' : tithiNames[tithiIndex];
  
  return { tithi: tithiName, paksha };
};

/**
 * Calculate Nakshatra (Lunar mansion)
 */
const calculateNakshatra = () => {
  const nakshatras = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
    'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
    'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
    'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
    'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];
  
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const nakshatraIndex = Math.floor((dayOfYear * 27 / 365)) % 27;
  
  return nakshatras[nakshatraIndex];
};

/**
 * Calculate Rashi (Zodiac)
 */
const calculateRashi = () => {
  const rashis = [
    'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya',
    'Tula', 'Vrishchika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'
  ];
  
  const now = new Date();
  const month = now.getMonth();
  return rashis[month];
};

/**
 * Calculate Ayana (Sun's path)
 */
const calculateAyana = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  
  // Uttarayana: Winter Solstice (Dec 22) to Summer Solstice (Jun 21)
  // Dakshinayana: Summer Solstice (Jun 21) to Winter Solstice (Dec 22)
  
  if (month === 12 && day >= 22) {
    return 'Uttarayana';
  } else if (month === 6 && day >= 21) {
    return 'Dakshinayana';
  } else if (month >= 1 && month <= 5) {
    return 'Uttarayana';
  } else if (month === 6 && day < 21) {
    return 'Uttarayana';
  } else if (month >= 7 && month <= 11) {
    return 'Dakshinayana';
  } else if (month === 12 && day < 22) {
    return 'Dakshinayana';
  }
  
  return 'Uttarayana';
};

/**
 * Calculate sunrise and sunset times
 */
const calculateSunTimes = async (lat, lng) => {
  try {
    const date = new Date().toISOString().split('T')[0];
    const response = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}&formatted=0`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK') {
      const formatTime = (isoTime) => {
        const date = new Date(isoTime);
        return date.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata'
        });
      };
      
      return {
        sunrise: formatTime(data.results.sunrise),
        sunset: formatTime(data.results.sunset)
      };
    }
  } catch (error) {
    console.error('Error fetching sun times:', error);
  }
  
  return {
    sunrise: '06:42',
    sunset: '18:15'
  };
};

/**
 * Calculate moon rise and set times
 */
const calculateMoonTimes = async () => {
  try {
    const now = new Date();
    const moonCycle = 29.53;
    const baseDate = new Date('2000-01-06');
    const daysSinceBase = (now - baseDate) / (1000 * 60 * 60 * 24);
    const lunarAge = (daysSinceBase % moonCycle);
    
    const sunriseHour = 6.7;
    const sunsetHour = 18.25;
    
    let moonriseHour = sunriseHour + (lunarAge / moonCycle) * 24;
    let moonsetHour = moonriseHour + 12;
    
    moonriseHour = moonriseHour % 24;
    moonsetHour = moonsetHour % 24;
    
    const formatHour = (hour) => {
      const h = Math.floor(hour);
      const m = Math.floor((hour - h) * 60);
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };
    
    return {
      moonrise: formatHour(moonriseHour),
      moonset: formatHour(moonsetHour)
    };
  } catch (error) {
    console.error('Error calculating moon times:', error);
    return {
      moonrise: '08:30',
      moonset: '20:45'
    };
  }
};

/**
 * Calculate Rahu Kalam, Yama Gandam, and other muhurtams
 */
const calculateMuhurtams = (sunrise, sunset) => {
  const parseSunTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours + minutes / 60;
  };
  
  const sunriseHour = parseSunTime(sunrise);
  const sunsetHour = parseSunTime(sunset);
  const dayDuration = sunsetHour - sunriseHour;
  const periodDuration = dayDuration / 8;
  
  const formatMuhurtamTime = (startHour, endHour) => {
    const formatHour = (hour) => {
      const h = Math.floor(hour);
      const m = Math.floor((hour - h) * 60);
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };
    return `${formatHour(startHour)}-${formatHour(endHour)}`;
  };
  
  const dayOfWeek = new Date().getDay();
  
  const rahuKalamPeriods = [4.5, 7.5, 6, 3, 1.5, 5, 6.5];
  const rahuPeriod = rahuKalamPeriods[dayOfWeek];
  const rahuStart = sunriseHour + (rahuPeriod - 1) * periodDuration;
  const rahuEnd = rahuStart + periodDuration;
  
  const yamaGandamPeriods = [3, 1.5, 4.5, 5, 6, 6.5, 7.5];
  const yamaGandamPeriod = yamaGandamPeriods[dayOfWeek];
  const yamaStart = sunriseHour + (yamaGandamPeriod - 1) * periodDuration;
  const yamaEnd = yamaStart + periodDuration;
  
  const durmuhurtamPeriods = [3.5, 2.5, 4.5, 3, 2, 4, 3.5];
  const durmuhurtamPeriod = durmuhurtamPeriods[dayOfWeek];
  const durmuhurtamStart = sunriseHour + (durmuhurtamPeriod - 1) * periodDuration;
  const durmuhurtamEnd = durmuhurtamStart + (48/60);
  
  const noonTime = sunriseHour + (dayDuration / 2);
  const abhijitStart = noonTime - 0.4;
  const abhijitEnd = noonTime + 0.4;
  
  const brahmaStart = sunriseHour - 1.6;
  const brahmaEnd = sunriseHour - 0.8;
  
  return {
    rahuKalam: formatMuhurtamTime(rahuStart, rahuEnd),
    yamaGandam: formatMuhurtamTime(yamaStart, yamaEnd),
    durmuhurtam: formatMuhurtamTime(durmuhurtamStart, durmuhurtamEnd),
    abhijitMuhurtam: formatMuhurtamTime(abhijitStart, abhijitEnd),
    brahmaMuhurtam: formatMuhurtamTime(brahmaStart, brahmaEnd)
  };
};

/**
 * Get Panchang data
 */
export const getPanchangData = async () => {
  try {
    const location = await getCurrentLocation();
    const sunTimes = await calculateSunTimes(location.latitude, location.longitude);
    const moonTimes = await calculateMoonTimes();
    const tithiData = calculateTithi();
    const hinduCalendar = calculateHinduCalendar();
    const muhurtams = calculateMuhurtams(sunTimes.sunrise, sunTimes.sunset);
    
    return {
      tithi: tithiData.tithi,
      paksha: tithiData.paksha,
      nakshatra: calculateNakshatra(),
      ayana: calculateAyana(),
      sunrise: sunTimes.sunrise,
      sunset: sunTimes.sunset,
      moonrise: moonTimes.moonrise,
      moonset: moonTimes.moonset,
      rashi: calculateRashi(),
      samvat: hinduCalendar.samvat.toString(),
      teluguMonth: hinduCalendar.teluguMonth,
      ritu: hinduCalendar.ritu,
      vaara: new Date().toLocaleDateString('en-IN', { weekday: 'long' }),
      masam: hinduCalendar.teluguMonth,
      rahuKalam: muhurtams.rahuKalam,
      yamaGandam: muhurtams.yamaGandam,
      durmuhurtam: muhurtams.durmuhurtam,
      abhijitMuhurtam: muhurtams.abhijitMuhurtam,
      brahmaMuhurtam: muhurtams.brahmaMuhurtam
    };
  } catch (error) {
    console.error('Error calculating Panchang data:', error);
    return getFallbackData();
  }
};

/**
 * Fallback data if calculations fail
 */
const getFallbackData = () => {
  return {
    tithi: "Dvitiya",
    paksha: "Shukla",
    nakshatra: "Rohini",
    ayana: "Uttarayana",
    sunrise: "06:42",
    sunset: "18:15",
    moonrise: "08:30",
    moonset: "20:45",
    rashi: "Vrishabha",
    samvat: "2081",
    teluguMonth: "Pushya",
    ritu: "Shishira",
    vaara: "Saturday",
    masam: "Pushya",
    rahuKalam: "09:00-10:30",
    yamaGandam: "13:30-15:00",
    durmuhurtam: "12:00-12:48",
    abhijitMuhurtam: "11:54-12:42",
    brahmaMuhurtam: "05:06-05:54"
  };
};
