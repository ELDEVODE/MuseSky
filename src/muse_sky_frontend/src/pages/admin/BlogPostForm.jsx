import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ROUTES } from '../../constants/routes';
import { blogPosts } from '../../constants/testData';
import BlogPost from '../BlogPost'; // Import the BlogPost component

const BlogPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
  });
  const [darkMode, setDarkMode] = useState(false);
  const [imageSource, setImageSource] = useState('url'); // 'url' or 'local'
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dropAreaRef = useRef(null);
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const titleRef = useRef(null);

  const [showPreview, setShowPreview] = useState(false);

  // Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Auto-save function
  const autoSave = useCallback(
    debounce(() => {
      setIsSaving(true);
      // Simulating an API call to save the data
      setTimeout(() => {
        console.log('Auto-saving:', formData);
        setLastSaved(new Date());
        setIsSaving(false);
      }, 1000);
    }, 2000),
    [formData]
  );

  // Effect for auto-save
  useEffect(() => {
    if (formData.title || formData.content || formData.imageUrl) {
      autoSave();
    }
  }, [formData, autoSave]);

  useEffect(() => {
    if (postId) {
      const post = blogPosts.find(p => p.id === parseInt(postId));
      if (post) {
        setFormData(post);
      }
    }
  }, [postId]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({ ...prev, title: newTitle }));
    adjustTextareaHeight();
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleImageUrlChange = (e) => {
    const newImageUrl = e.target.value;
    setFormData((prev) => ({ ...prev, imageUrl: newImageUrl }));
  };

  const handleSave = () => {
    console.log('Post saved:', formData);
    navigate(ROUTES.ADMIN_BLOG_POSTS);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleImageSourceChange = (source) => {
    setImageSource(source);
    setFormData({ ...formData, imageUrl: '' });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange({ target: { files } });
    }
  };

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.startsWith('http')) {
      setFormData({ ...formData, imageUrl: pastedText });
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const themeClass = darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900';
  const headerClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const inputClass = darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500';
  const editorClass = darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900';

  const buttonClass = (isActive) => (`px-4 py-2 ${isActive
    ? 'bg-blue-600 text-white'
    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    } transition-colors duration-200`);

  const fileInputClass = `w-full p-2 border rounded ${inputClass} file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`;

  const renderImageSection = () => {
    if (formData.imageUrl) {
      return (
        <div className="relative mb-6">
          <img src={formData.imageUrl} alt="Featured" className="w-full h-48 sm:h-64 object-cover rounded" />
          <button
            onClick={() => setFormData({ ...formData, imageUrl: '' })}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      );
    }

    return (
      <div
        ref={dropAreaRef}
        className={`mb-6 p-4 sm:p-8 border-2 border-dashed rounded-lg text-center transition-all duration-300 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          } ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <p className="text-base sm:text-lg font-semibold">Add a featured image</p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => fileInputRef.current.click()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Choose File
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <input
              type="url"
              value={formData.imageUrl}
              onChange={handleImageUrlChange}
              onPaste={handlePaste}
              className={`p-2 border rounded ${inputClass} w-full sm:w-auto`}
              placeholder="Or paste image URL"
            />
          </div>
          <p className="text-xs sm:text-sm text-gray-500">
            Drag and drop an image here, choose a file, or paste an image URL
          </p>
        </div>
      </div>
    );
  };

  // Modify the renderSaveStatus function
  const renderSaveStatus = () => {
    return (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${isSaving ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {isSaving ? 'Saving...' : 'Saved'}
        </span>
      </div>
    );
  };

  // Add a function to format the last saved time
  const formatLastSaved = () => {
    if (!lastSaved) return '';
    const now = new Date();
    const diffInSeconds = Math.floor((now - lastSaved) / 1000);
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return lastSaved.toLocaleDateString();
  };

  // Modify the adjustTextareaHeight function
  const adjustTextareaHeight = () => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
      // Ensure minimum height on mobile
      titleRef.current.style.minHeight = '3em';
    }
  };

  // Add a new useEffect hook for window resize events
  useEffect(() => {
    const handleResize = () => {
      adjustTextareaHeight();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Modify the existing useEffect hook
  useEffect(() => {
    adjustTextareaHeight();
  }, [formData.title]);

  const handlePreview = () => {
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const PreviewModal = () => {
    if (!showPreview) return null;

    const previewPost = {
      id: 'preview',
      title: formData.title,
      content: formData.content,
      imageUrl: formData.imageUrl,
      date: new Date().toISOString(),
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-hidden flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 w-full h-full md:w-11/12 md:h-5/6 lg:w-10/12 lg:h-5/6 xl:w-3/4 xl:h-5/6 rounded-lg shadow-2xl flex flex-col">
          <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Preview</h2>
            <button
              onClick={closePreview}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="flex-grow overflow-auto">
            <div className="h-full">
              <BlogPost post={previewPost} isPreview={true} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`mx-auto min-h-screen ${themeClass} rounded-xl pb-12 px-4 sm:px-6 lg:px-8`}>
      <header className={`${headerClass} p-4 flex flex-col gap-4 sm:gap-8 sm:flex-row justify-between items-start rounded-t-xl`}>
        <div className="flex-grow w-full sm:w-auto">
          <textarea
            ref={titleRef}
            value={formData.title}
            onChange={handleTitleChange}
            className={`w-full text-xl sm:text-2xl md:text-3xl font-bold bg-transparent border-none outline-none resize-none overflow-hidden ${darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
            placeholder="Enter your title"
            rows="1"
            style={{ minHeight: '3em' }}
          />
          <div className="mt-2 flex items-center space-x-2">
            {renderSaveStatus()}
            {lastSaved && (
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {formatLastSaved()}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-600"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={handlePreview}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Preview
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Publish
          </button>
        </div>
      </header>
      <main className="p-4 sm:p-6">
        {renderImageSection()}
        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
          className={`h-[calc(100vh-300px)] ${editorClass}`}
          placeholder="Start writing your story..."
        />
      </main>
      <style jsx global>{`
        .ql-toolbar {
          background-color: ${darkMode ? '#1a202c' : '#f7fafc'};
          border-color: ${darkMode ? '#4a5568' : '#e2e8f0'} !important;
        }
        .ql-container {
          border-color: ${darkMode ? '#4a5568' : '#e2e8f0'} !important;
        }
        .ql-editor {
          color: ${darkMode ? '#f7fafc' : '#1a202c'};
        }
        .ql-editor.ql-blank::before {
          color: ${darkMode ? '#a0aec0' : '#718096'};
        }
        .ql-snow .ql-stroke {
          stroke: ${darkMode ? '#a0aec0' : '#4a5568'};
        }
        .ql-snow .ql-fill {
          fill: ${darkMode ? '#a0aec0' : '#4a5568'};
        }
        .ql-snow .ql-picker {
          color: ${darkMode ? '#a0aec0' : '#4a5568'};
        }
      `}</style>
      <PreviewModal />
    </div>
  );
};

export default BlogPostForm;
