import React, { useState, useEffect } from 'react'
import { BannerSection, CardCarousel, CoolButton, FAQAccordion, NewsLetterSection, TwinkleStars } from '../components'
import { Star7 } from '../assets/svg'
import CollectionCardCarousel from '../components/CollectionCardCarousel'
import { aboutCards, blogPosts, collections } from '../constants/testData'
import FeaturesSection from '../components/FeaturesSection'
import AboutStack from '../components/AboutStack'
import FAQSection from '../components/FAQSection'
import BlogCarousel from '../components/BlogCarousel'
import BackgroundCircles from '../components/BackgroundCircles'
import HeroCard from '../components/HeroCard'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import LoadingScreen from '../components/LoadingScreen'

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className='bg-transparent relative max-w-[100vw]'>
      {/* hero section */}
      <div className="max-w-[100vw] md:pt-12 overflow-x-hidden relative">
        <div className="max-w-6xl my-16 pt-10 mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex-col justify-center items-start gap-8 inline-flex mb-12 md:mb-0">
            <div className="flex-col justify-start items-start gap-6 flex">
              <div className="self-stretch flex-col justify-start items-start gap-2 flex">
                <div className="w-full md:w-[400px]">
                  <span className="text-white text-4xl md:text-5xl font-extrabold font-bricolage leading-tight">Discover and collect Extraordinary </span>
                  <span className="text-[#ffc252] text-4xl md:text-5xl font-extrabold font-bricolage leading-tight">Weather</span>
                  <span className="text-white text-4xl md:text-5xl font-extrabold font-bricolage leading-tight"> NFTs </span>
                </div>
                <div className="self-stretch text-white text-lg md:text-base font-normal font-onest mt-6">Where Bitcoin meets digital art, evolving with nature's rhythm</div>
              </div>
            </div>
            <CoolButton onClick={() => navigate(ROUTES.COLLECTION)}>Collect Now</CoolButton>
          </div>

          {/* HeroCard component */}
          <HeroCard />
        </div>

        <TwinkleStars frequency={10} />
      </div>

      <div className='bg-transparent relative'>
        <BackgroundCircles count={10} />

        {/* banner section */}
        <div className="max-w-[100vw] overflow-hidden relative">

          <BannerSection />

          <TwinkleStars frequency={2} />
        </div>

        {/* Cards section */}
        <div className='max-w-[100vw] py-[100px] overflow-hidden relative px-6 md:px-[100px]'>
          <div className="mx-auto w-full flex-col justify-center items-center gap-6 inline-flex">
            <div className="text-white text-xl md:text-2xl font-normal font-onest text-center">Explore our new NFT collection</div>
            <div className="flex items-center gap-4">
              <div className="w-5 h-5 md:w-6 md:h-6 rotate-45 bg-white/20 rounded-md border border-white backdrop-blur-sm" />
              <h2 className="text-center text-white text-4xl md:text-5xl font-bold font-bricolage mx-2">Top NFTs</h2>
              <div className="w-5 h-5 md:w-6 md:h-6 rotate-45 bg-white/20 rounded-md border border-white backdrop-blur-sm" />
            </div>
          </div>
          <CardCarousel />
          <div className="mt-10 w-full flex justify-center">
            <CoolButton onClick={() => navigate(ROUTES.COLLECTION)}>View All Collection</CoolButton>
          </div>

          <TwinkleStars frequency={30} />
        </div>

        {/* collections section */}
        <div className='w-full relative py-[75px] md:py-[100px] overflow-hidden px-6 md:px-[100px]'>
          <div className="max-w-6xl mx-auto">
            <div className="mx-auto w-full flex-col justify-center items-center gap-6 inline-flex">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 md:w-6 md:h-6 rotate-45 bg-white/20 rounded-md border border-white backdrop-blur-sm" />
                <h2 className="text-center text-white text-4xl md:text-5xl font-bold font-bricolage mx-2">Top Collections</h2>
                <div className="w-5 h-5 md:w-6 md:h-6 rotate-45 bg-white/20 rounded-md border border-white backdrop-blur-sm" />
              </div>
              <div className="text-white text-xl md:text-2xl font-normal font-onest text-center">Explore our new NFT collection</div>
            </div>
            <CollectionCardCarousel collections={collections} className="mt-[75px] md:mt-[100px] max-w-5xl mx-auto" />
            <div className="mt-[50px] md:mt-[60px] w-full flex justify-center">
              <CoolButton>Explore More</CoolButton>
            </div>
          </div>

          <TwinkleStars frequency={18} />
        </div>

        {/* Features Section  */}
        <div className='max-w-[100vw] relative overflow-hidden hidden md:block'>
          <FeaturesSection />
        </div>

        {/* About Section */}
        <div className='w-full relative'>
          <div className='max-w-6xl mx-auto pt-[150px] md:pt-[200px] relative py-[75px] md:py-[100px] overflow-hidden px-6'>
            <div className="mx-auto w-full flex-col justify-center items-center gap-6 inline-flex">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 md:w-6 md:h-6 rotate-45 bg-white/20 rounded-md border border-white backdrop-blur-sm" />
                <h2 className="text-center text-white text-4xl md:text-5xl font-bold font-bricolage mx-2">About</h2>
                <div className="w-5 h-5 md:w-6 md:h-6 rotate-45 bg-white/20 rounded-md border border-white backdrop-blur-sm" />
              </div>
            </div>

            <AboutStack cards={aboutCards} className="w-full md:w-[85%] mx-auto mt-10" />
          </div>

          <TwinkleStars frequency={18} />
        </div>

        {/* FAQ Section */}
        <div className='max-w-[100vw] px-6 md:px-[100px] py-[75px] md:py-[100px] relative overflow-hidden'>
          <FAQSection />

          <TwinkleStars frequency={7} />
        </div>

        {/* Blog Section */}
        <div className='max-w-[100vw] px-6 py-[75px] md:py-[100px] relative overflow-hidden'>
          <div className="max-w-6xl mx-auto">
            <div className="mb-[50px] flex flex-col md:flex-row justify-between items-start w-full">
              <div className="w-full md:w-[768px] flex-col justify-start items-start gap-5 inline-flex mb-6 md:mb-0">
                <div className="self-stretch text-white text-4xl md:text-5xl font-semibold font-bricolage">Blogs</div>
                <div className="self-stretch text-[#dfdfd1] text-lg md:text-base font-normal font-onest leading-[30px]">The latest news, technologies, and resources from our team.</div>
              </div>
              <div className="flex justify-center md:justify-end w-full hidden md:flex relative">
                <CoolButton onClick={() => navigate(ROUTES.BLOG)}>View All Posts</CoolButton>
              </div>
            </div>
            <BlogCarousel posts={blogPosts} />
            <div className="flex justify-center md:justify-end mt-5 w-full flex md:hidden relative">
              <CoolButton onClick={() => navigate(ROUTES.BLOG)}>View All Posts</CoolButton>
            </div>
          </div>

          <TwinkleStars frequency={5} />
        </div>

      </div>

      {/* NewsLetter Section */}
      <div className="max-w-[100vw] px-6 md:px-[100px] py-[75px] md:py-[100px] relative overflow-hidden">
        <NewsLetterSection />
      </div>

      {/* background circle thingies */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-30 bg-[#ff8f1f] rounded-full blur-[150px] z-[-1]" />
      <div className="absolute top-32 right-0 w-64 h-64 opacity-30 bg-[#ff8f1f] rounded-full blur-[100px] z-[-1]" />
      <div className="absolute top-48 right-48 w-64 h-64 opacity-30 bg-[#ff8f1f] rounded-full blur-[100px] z-[-1]" />
    </div>
  )
}

export default HomePage
