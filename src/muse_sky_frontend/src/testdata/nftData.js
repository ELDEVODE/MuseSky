import { Rectangle25, Rectangle26, Rectangle27, Rectangle28, defaultUser, images101 } from '../assets/images';

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

// Add this array of world cities
const worldCities = [
  "New York", "Tokyo", "London", "Paris", "Sydney", "Rio de Janeiro", "Moscow", "Dubai",
  "Singapore", "Berlin", "Rome", "Cairo", "Mumbai", "Toronto", "Seoul", "Amsterdam",
  "Istanbul", "Bangkok", "Cape Town", "Buenos Aires", "Vancouver", "San Francisco",
  "Madrid", "Vienna", "Prague", "Stockholm", "Helsinki", "Oslo", "Copenhagen", "Athens", "Lagos",
  "Cincinnati", "Benin"
];

// Function to get a random city
const getRandomCity = () => worldCities[Math.floor(Math.random() * worldCities.length)];

export const testNFTs = Array.from({ length: 100 }, (_, index) => {
  const weather = getRandomWeather();
  return {
    id: `NFT${index + 1}`,
    title: `Sky Scene ${index + 1}`,
    current_weather: weather,
    image: weatherImages[weather],
    all_images: Object.values(weatherImages),
    weather_icon: weatherIcons[weather],
    basePrice: '0.024',
    priceUSD: '$3,618.36',
    creator: {
      name: "John Doe",
      avatar: defaultUser
    },
    location: getRandomCity() 
  };
});

export const testNFT = testNFTs[0];

export const collection = {
  id: 'orb200',
  title: `The Orbitians`,
  description: `The Orbitians is a collection of 10,000 unique NFTs on the Ethereum blockchain.
  There are all sorts of beings in the NFT Universe. The most advanced and friendly
  of the bunch are Orbitians. They live in metal space machines, high up in the sky
  and only have one foot on Earth.
  
  These Orbitians are a peaceful race, but they have been at war with a group of invaders
  for many generations. The invaders are called Upside-Downs, because of their inverted
  bodies that live on the ground, yet do not know any other way to be. Upside-Downs believe
  that they will be able to win this war if they could only get an eye into Orbitian territory,
  so they've taken to make human beings their target.`,
  creator: {
    id: 'orbitian-id',
    name: 'Orbitian',
    avatar: defaultUser,
  },
  mintDate: 'Sep 30, 2022',
  basePrice: '0.024 ckBTC',
  priceUSD: '$3,618.36',
  priceChange: '+2.48%',
  tags: ['Animation', 'Illustration', 'Moon', 'Space', 'Galaxy', 'NFT'],
  views: '10k',
  likes: 234,
};
