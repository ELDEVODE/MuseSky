import React, { useState } from 'react';
import { 
  FiGlobe, 
  FiInstagram, 
  FiX,
  FiPlusCircle,
  FiMinusCircle,
} from 'react-icons/fi';
import { 
  FaDiscord, 
  FaTelegram,
} from 'react-icons/fa';

const SocialMediaLinks = ({ setSocialLinks }) => {
  const [socialLinks, setLocalSocialLinks] = useState({
    website: '',
    instagram: '',
    discord: '',
    telegram: '',
    x: ''
  });

  const [activeInputs, setActiveInputs] = useState({
    website: false,
    instagram: false,
    discord: false,
    telegram: false,
    x: false
  });

  const [hoveredPlatform, setHoveredPlatform] = useState(null);

  const handleToggleInput = (platform) => {
    setActiveInputs(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
    if (!activeInputs[platform]) {
      setLocalSocialLinks(prev => ({
        ...prev,
        [platform]: ''
      }));
    }
  };

  const handleInputChange = (platform, value) => {
    setLocalSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const getPlatformLabel = (id) => {
    switch(id) {
      case 'website': return 'Website';
      case 'instagram': return 'Instagram';
      case 'discord': return 'Discord';
      case 'telegram': return 'Telegram';
      case 'x': return 'X (Twitter)';
      default: return id;
    }
  };

  const socialPlatforms = [
    { id: 'website', icon: FiGlobe, placeholder: 'Your website URL' },
    { id: 'instagram', icon: FiInstagram, placeholder: 'Instagram profile URL' },
    { id: 'discord', icon: FaDiscord, placeholder: 'Discord server URL' },
    { id: 'telegram', icon: FaTelegram, placeholder: 'Telegram group URL' },
    { id: 'x', icon: FiX, placeholder: 'X (Twitter) profile URL' }
  ];

  return (
    <div className="border-b border-[#CECCD6]/30 pb-10">
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm text-[#E6E6EB] font-medium font-['Onest']">
          Social Media Links
        </label>
        <span className="text-[#858584] text-xs font-['Onest']">
          (Optional)
        </span>
      </div>
      <p className="text-sm text-[#858584] mb-6 font-['Onest']">
        Click on the social media icons below to add your profile links
      </p>
      
      <div className="space-y-4">
        {socialPlatforms.map(({ id, icon: Icon, placeholder }) => (
          <div key={id} className="flex items-center gap-4 group">
            <div className="relative">
              <button
                type="button"
                onClick={() => handleToggleInput(id)}
                onMouseEnter={() => setHoveredPlatform(id)}
                onMouseLeave={() => setHoveredPlatform(null)}
                className={`p-3 rounded-lg transition-all duration-300 relative ${
                  activeInputs[id] 
                    ? 'bg-[#FFC252] text-black' 
                    : 'bg-white/20 text-white hover:bg-[#FFC252]/20'
                }`}
              >
                <Icon size={20} />
                {!activeInputs[id] && (
                  <FiPlusCircle 
                    className="absolute -top-1 -right-1 text-[#FFC252] bg-black rounded-full" 
                    size={14} 
                  />
                )}
              </button>
              
              {/* Hover tooltip */}
              {hoveredPlatform === id && !activeInputs[id] && (
                <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-black/90 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                  Add {getPlatformLabel(id)} link
                </div>
              )}
            </div>

            {activeInputs[id] ? (
              <div className="flex-grow relative group">
                <input
                  type="url"
                  value={socialLinks[id]}
                  onChange={(e) => handleInputChange(id, e.target.value)}
                  placeholder={placeholder}
                  className="w-full h-12 px-3 bg-white/20 rounded-lg border border-[#FFC252]/20 text-white placeholder-[#858584] text-sm font-normal font-['Onest'] leading-snug focus:outline-none transition-all duration-300 focus:border-[#FFC252]/50"
                />
                <button
                  onClick={() => handleToggleInput(id)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EF466F] hover:text-[#EF466F]/80 transition-colors duration-300"
                  title="Remove link"
                >
                  <FiMinusCircle size={18} />
                </button>
                <div className="absolute -top-2 left-3 bg-[#1F1F22] px-2 text-xs text-[#FFC252]">
                  {getPlatformLabel(id)}
                </div>
              </div>
            ) : (
              <div className="flex-grow">
                <p className="text-[#858584] text-sm font-['Onest']">
                  {`Add your ${getPlatformLabel(id).toLowerCase()} profile link`}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {Object.values(activeInputs).some(active => active) && (
        <p className="text-xs text-[#858584] mt-4 font-['Onest']">
          Make sure to include the complete URL (e.g., https://www.example.com)
        </p>
      )}
    </div>
  );
};

export default SocialMediaLinks;