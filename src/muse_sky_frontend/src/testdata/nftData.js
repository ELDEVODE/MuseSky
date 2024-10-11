import { Rectangle25, Rectangle26, Rectangle27, Rectangle28 } from '../assets/images';

export const weatherConditions = ['Sunny', 'Windy', 'Cloudy', 'Rainy'];

const weatherImages = {
  Sunny: Rectangle25,
  Windy: Rectangle26,
  Cloudy: Rectangle27,
  Rainy: Rectangle28,
};

export const weatherIcons = {
  Sunny: '☀️',
  Windy: '💨',
  Cloudy: '☁️',
  Rainy: '🌧️',
};

function getRandomWeather() {
  return weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
}

export const testNFTs = Array.from({ length: 100 }, (_, index) => {
  const weather = getRandomWeather();
  return {
    id: `NFT${index + 1}`,
    title: `Sky Scene ${index + 1}`,
    current_weather: weather,
    image: weatherImages[weather],
    all_images: Object.values(weatherImages),
    weather_icon: weatherIcons[weather],
  };
});