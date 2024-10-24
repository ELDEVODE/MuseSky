import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import { TwinkleStars } from '../../components';
import BackgroundCircles from '../../components/BackgroundCircles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './QuillEditor.css';
import SocialMediaLinks from '../../components/socialMediaLinks';
import { useCreateCollection, useAllCollections, uint8ArrayToImageUrl } from '../../store/BackendCall';

function CreateCollection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    collectionName: '',
    creatorName: '',
    description: '',
    tags: [],
    currentTag: '',
    coverImage: null,
    // currency: 'ICP',
    // basePrice: '',
    socialLinks: {
      website: '',
      instagram: '',
      discord: '',
      telegram: '',
      x: ''
    }
  });

  const [wordCount, setWordCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);
  const dropZoneRef = useRef(null);

  const { mutate: createCollection, isSuccess } = useCreateCollection();
  const { refetch: refetchCollections } = useAllCollections();

  useEffect(() => {
    if (isSuccess) {
      refetchCollections();
    }
  }, [isSuccess, refetchCollections]);

  const currencies = [
    { value: 'BTC', label: 'Bitcoin (BTC)' },
    { value: 'ETH', label: 'Ethereum (ETH)' },
    { value: 'SOL', label: 'Solana (SOL)' },
    { value: 'ICP', label: 'Internet Computer (ICP)' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


      createCollection({
        name: formData.collectionName,
        image: formData.coverImage,
        description: formData.description,
        website: formData.socialLinks.website || null,
        x: formData.socialLinks.x || null,
        instagram: formData.socialLinks.instagram || null,
        discord: formData.socialLinks.discord || null,
        telegram: formData.socialLinks.telegram || null,
        creator_name: formData.creatorName,
        tags: formData.tags,
      });
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  const handleImageUpload = useCallback((file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          coverImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (formData.currentTag.trim() && !formData.tags.includes(formData.currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: ''
      }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  const quillFormats = [
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'link'
  ];

  const handleDescriptionChange = useCallback((value) => {
    const words = value.replace(/<[^>]*>/g, '').trim().split(/\s+/);
    if (words.length <= 500 || words[0] === '') {
      setFormData(prev => ({
        ...prev,
        description: value
      }));
      setWordCount(words[0] === '' ? 0 : words.length);
    }
  }, []);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, []);

  useEffect(() => {
    const div = dropZoneRef.current;
    if (div) {
      div.addEventListener('dragenter', handleDragIn);
      div.addEventListener('dragleave', handleDragOut);
      div.addEventListener('dragover', handleDrag);
      div.addEventListener('drop', handleDrop);

      return () => {
        div.removeEventListener('dragenter', handleDragIn);
        div.removeEventListener('dragleave', handleDragOut);
        div.removeEventListener('dragover', handleDrag);
        div.removeEventListener('drop', handleDrop);
      };
    }
  }, [handleDragIn, handleDragOut, handleDrag, handleDrop]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleCancel = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative w-full text-white overflow-hidden px-6">
      <div className="relative mb-10">
        <div className="w-full py-8 mt-[100px] bg-transparent flex flex-col justify-center items-center relative">
          <div className='flex flex-col w-full items-center justify-center pb-10 gap-4 border-b border-[#CECCD6]/30'>
            <h1 className="text-4xl sm:text-5xl font-bold font-['Bricolage Grotesque'] capitalize leading-tight mb-1">
              CREATE NEW COLLECTION
            </h1>
            <p className="text-sm font-normal font-['Onest'] leading-relaxed">
              Create your own unique NFT collection and share it with the world.
            </p>
          </div>
          <div className="w-full max-w-3xl px-3 flex mt-10 flex-col gap-4">
            <h2 className="block text-md font-medium font-['Onest'] mb-1">Collection Details</h2>
            <form onSubmit={handleSubmit} className="mt-2 space-y-6">
              <div>
                <label htmlFor="collectionName" className="block text-sm text-[#E6E6EB] font-medium font-['Onest'] mb-1">
                  Collection Name
                </label>
                <input
                  type="text"
                  id="collectionName"
                  value={formData.collectionName}
                  onChange={(e) => setFormData(prev => ({ ...prev, collectionName: e.target.value }))}
                  className="w-full h-12 px-3 bg-white/20 rounded-lg border border-[#FFC252]/20 text-white placeholder-[#858584] text-sm font-normal font-['Onest'] leading-snug focus:outline-none"
                  placeholder="Enter your Collection name"
                  required
                />
              </div>
              <div>
                <label htmlFor="creatorName" className="block text-sm text-[#E6E6EB] font-medium font-['Onest'] mb-1">
                  Creator's Name
                </label>
                <input
                  type="text"
                  id="creatorName"
                  value={formData.creatorName}
                  onChange={(e) => setFormData(prev => ({ ...prev, creatorName: e.target.value }))}
                  className="w-full h-12 px-3 bg-white/20 rounded-lg border border-[#FFC252]/20 text-white placeholder-[#858584] text-sm font-normal font-['Onest'] leading-snug focus:outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="relative">
                <ReactQuill
                  ref={quillRef}
                  placeholder='Add a description'
                  theme="snow"
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  modules={quillModules}
                  formats={quillFormats}
                  className="bg-white/20 rounded-lg text-white"
                />
                <div className="flex justify-between items-center mt-1">
                  <label htmlFor="description" className="block text-[#E6E6EB]/60 text-sm font-medium font-['Onest']">
                    {wordCount}/500 words
                  </label>
                  {wordCount >= 500 && (
                    <span className="text-yellow-400 text-sm font-medium font-['Onest']">
                      Word limit reached
                    </span>
                  )}
                </div>
              </div>

              <div className='border-b border-[#CECCD6]/30 pb-10'>
                <label htmlFor="tags" className="block text-sm text-[#E6E6EB] font-medium font-['Onest'] mb-1">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="bg-white/20 text-white px-2 py-1 rounded-full text-sm">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-white/50 hover:text-white"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    id="tags"
                    value={formData.currentTag}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentTag: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag(e)}
                    className="flex-grow h-12 px-3 bg-white/20 rounded-l-lg border border-[#FFC252]/20 text-white placeholder-[#858584] text-sm font-normal font-['Onest'] leading-snug focus:outline-none"
                    placeholder="e.g : art, painting, etc"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 bg-white/30 text-white rounded-r-lg hover:bg-white/40 transition-colors duration-300"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className='border-b border-[#CECCD6]/30 pb-10'>
                <label htmlFor="coverImage" className="block text-sm font-medium font-['Onest'] mb-1">
                  Cover Image
                </label>
                <div
                  ref={dropZoneRef}
                  className={`flex items-center justify-center w-full relative ${isDragging ? 'border-2 border-[#FFC252] rounded-lg' : ''
                    }`}
                >
                  {isDragging && (
                    <div className="absolute inset-0 bg-[#FFC252]/20 rounded-lg flex items-center justify-center z-10">
                      <p className="text-lg font-semibold text-white">Drop image here</p>
                    </div>
                  )}
                  <label
                    htmlFor="coverImage"
                    className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${isDragging ? 'border-[#FFC252]/40' : 'border-[#FFC252]/20 hover:border-[#FFC252]/30'
                      } transition-all duration-300`}
                  >
                    {formData.coverImage ? (
                      <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FiUpload className="w-10 h-12 mb-3 text-white" />
                        <p className="mb-2 text-sm text-white font-['Onest']">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-white/70 font-['Onest']">PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                    )}
                    <input
                      id="coverImage"
                      type="file"
                      className="hidden"
                      onChange={handleFileInputChange}
                      accept="image/*"
                      ref={fileInputRef}
                    />
                  </label>
                </div>
              </div>

              {/* <div className="border-b border-[#CECCD6]/30 pb-10 space-y-6">
                <div>
                  <label className="block text-sm text-[#E6E6EB] font-medium font-['Onest'] mb-1">
                    Currency
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-full h-12 px-3 bg-white/20 rounded-lg border border-[#FFC252]/20 text-white placeholder-[#858584] text-sm font-normal font-['Onest'] leading-snug focus:outline-none"
                  >
                    {currencies.map(({ value, label }) => (
                      <option key={value} value={value} className="bg-[#1F1F1F] hover:bg-[#2A2A2A]">
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#E6E6EB] font-medium font-['Onest'] mb-1">
                    Base Price
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.basePrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, basePrice: e.target.value }))}
                      step="0.00000001"
                      min="0"
                      className="w-full h-12 px-3 bg-white/20 rounded-lg border border-[#FFC252]/20 text-white placeholder-[#858584] text-sm font-normal font-['Onest'] leading-snug focus:outline-none"
                      placeholder={`Enter base price in ${formData.currency}`}
                      required
                    />
                  </div>
                </div>
              </div> */}

              <SocialMediaLinks setSocialLinks={(links) => setFormData(prev => ({ ...prev, socialLinks: links }))} />

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="submit"
                  className="py-4 px-4 bg-[#ffc252] text-black rounded-lg font-semibold font-medium font-['Onest'] transition-all duration-300 hover:bg-[#ffd280] focus:outline-none focus:ring-2 focus:ring-[#ffc252] focus:ring-opacity-50"
                >
                  Create Collection
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-md font-semibold font-normal cursor-pointer hover:text-[#fff] font-['Onest'] inline-block text-[#EF466F]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <BackgroundCircles count={5} />
      <TwinkleStars frequency={14} />
    </div>
  );
}

export default CreateCollection;