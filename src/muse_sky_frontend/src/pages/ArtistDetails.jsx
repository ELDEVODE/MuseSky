import React from 'react';
import { useParams } from 'react-router-dom';
import { TwinkleStars } from '../components';
import BackgroundCircles from '../components/BackgroundCircles';

function ArtistDetails() {
  const { id } = useParams();

  // Placeholder data - replace with actual data fetching logic
  const artist = {
    id,
    name: 'Orbitian',
    avatar: 'https://via.placeholder.com/100x100',
    bio: 'Orbitian is a renowned digital artist known for creating unique NFT collections that blend space themes with abstract art.',
    collections: ['The Orbitians', 'Space Odyssey', 'Cosmic Dreams'],
    totalSales: '1,000 ckBTC',
    followers: '10k',
  };

  return (
    <div className="relative w-full text-white py-2 px-6 md:px-6 lg:px-8 pb-32">
      <div className='max-w-6xl mx-auto mt-16 md:mt-32'>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img src={artist.avatar} alt={artist.name} className="w-32 h-32 rounded-full" />
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">{artist.name}</h1>
            <p className="text-base md:text-lg text-gray-400 mb-6">{artist.bio}</p>
            <div className="flex gap-6">
              <div>
                <h2 className="text-sm text-gray-400">Total Sales</h2>
                <p className="text-xl font-semibold">{artist.totalSales}</p>
              </div>
              <div>
                <h2 className="text-sm text-gray-400">Followers</h2>
                <p className="text-xl font-semibold">{artist.followers}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artist.collections.map((collection, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{collection}</h3>
                {/* Add more details about each collection here */}
              </div>
            ))}
          </div>
        </div>
      </div>

      <BackgroundCircles count={5} />
      <TwinkleStars frequency={20} />
    </div>
  );
}

export default ArtistDetails;
