# Panchang Watch Face for Mi Revolve

A beautiful React-based watch face displaying Hindu Panchang (almanac) information.

## Features
- Live time display
- Daily Panchang details (Tithi, Nakshatra, Yoga, Karana)
- Sunrise/Sunset times
- Battery indicator
- Responsive circular design

## Installation

1. Create a new folder and navigate to it:
```bash
mkdir panchang-watch-face
cd panchang-watch-face
```

2. Copy all the files from this project into the folder

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

### Adding Real Panchang API

To use real Panchang data, edit `src/utils/panchangApi.js`:

1. Sign up for a Panchang API service (e.g., ProKerala, AstroVed)
2. Get your API key
3. Replace the mock data with actual API calls

Example APIs:
- ProKerala: https://api.prokerala.com/
- AstroVed: https://www.astroved.com/api
- Drik Panchang API

### Customization

- **Colors**: Edit Tailwind classes in `PanchangWatchFace.jsx`
- **Size**: Adjust `w-80 h-80` to match your watch screen
- **Data refresh**: Change interval in useEffect (default: 1 hour)

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## For Mi Fitness Integration

To integrate with Mi Fitness app:
1. Export the watch face design as images/assets
2. Use Mi Watch Face Studio to create the watch face
3. Package and upload to Mi Fitness

## License
MIT
