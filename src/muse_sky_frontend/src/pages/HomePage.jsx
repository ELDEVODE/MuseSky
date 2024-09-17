import React from 'react'
import { sunClouds } from '../assets/images'
import { BannerSection, CardCarousel, CoolButton, FAQAccordion, NewsLetterSection, TwinkleStars } from '../components'
import { Star7 } from '../assets/svg'
import CollectionCardCarousel from '../components/CollectionCardCarousel'
import { aboutCards, blogPosts, collections } from '../constants/testData'
import FeaturesSection from '../components/FeaturesSection'
import AboutStack from '../components/AboutStack'
import FAQSection from '../components/FAQSection'
import BlogCarousel from '../components/BlogCarousel'

function HomePage() {
  return (
    <>
      {/* hero section */}
      <div className="max-w-[100vw] overflow-x-hidden relative">
        <div className="container my-12 mx-auto px-[100px] flex justify-between items-center">
          <div className="flex-col justify-center items-start gap-8 inline-flex">
            <div className="flex-col justify-start items-start gap-6 flex">
              <div className="self-stretch flex-col justify-start items-start gap-2 flex">
                <div className="w-[400px]">
                  <span className="text-white text-5xl font-extrabold font-bricolage leading-tight">Discover and collect Extraordinary </span>
                  <span className="text-[#ffc252] text-5xl font-extrabold font-bricolage leading-tight">Weather</span>
                  <span className="text-white text-5xl font-extrabold font-bricolage leading-tight"> NFTs </span>
                </div>
                <div className="self-stretch text-white text-sm font-normal font-onest">Where Bitcoin meets digital art, evolving with nature's rhythm</div>
              </div>
            </div>
            <CoolButton>Collect Now</CoolButton>
          </div>

          {/* card section */}
          <div className="w-[400px] h-[450px] relative">
            <div className="w-full h-full p-4 absolute rounded-2xl border border-[#ffaa0c] flex-col justify-start items-start inline-flex">
              <div className="w-full mx-auto bg-white/20 rounded-xl overflow-hidden">
                <img className="w-full h-[340px] object-cover" src={sunClouds} alt="NFT Preview" />
              </div>
              <div className="bottom flex flex-row justify-between w-full mt-2">
                <div className="flex flex-col justify-start items-start gap-1">
                  <div className="text-[#d7d7d7] text-sm font-semibold font-['Onest']">MDR collection</div>
                  <div className="text-[#d7d7d7] text-xs font-normal font-['Onest']">MDR #10123334</div>
                </div>
                <div className="flex flex-col justify-start items-end gap-1">
                  <div className="text-[#d7d7d7] text-sm font-semibold font-['Onest']">Top bid</div>
                  <div className="text-[#d7d7d7] text-xs font-normal font-['Onest']">3.222</div>
                  <div className="text-[#d7d7d7] text-xs font-normal font-['Onest']">7days left</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* background circle thingies */}
        <div className="absolute top-0 left-0 w-64 h-64 opacity-30 bg-[#ff8f1f] rounded-full blur-[150px] z-[-1]" />
        <div className="absolute top-32 right-0 w-64 h-64 opacity-30 bg-[#ff8f1f] rounded-full blur-[100px] z-[-1]" />
        <div className="absolute top-48 right-48 w-64 h-64 opacity-30 bg-[#ff8f1f] rounded-full blur-[100px] z-[-1]" />
        <TwinkleStars frequency={10} />
      </div>


      {/* banner section */}
      <div className="max-w-[100vw] overflow-hidden relative">

        <BannerSection />

        {/* background circle thingies */}
        <TwinkleStars frequency={2} />
      </div>

      {/* Cards section */}
      <div className='max-w-[100vw] py-[100px] overflow-hidden relative'>
        <div className="mx-auto w-full flex-col justify-center items-center gap-4 inline-flex">
          <div className="text-white text-xl font-normal font-['Onest'] ">Explore our new NFT collection</div>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rotate-45 bg-white/20 rounded-md border border-white backdrop-blur-sm" />
            <h2 className="text-center text-white text-5xl font-bold font-['Bricolage Grotesque'] mx-2">Top NFTs</h2>
            <div className="w-6 h-6 rotate-45 bg-white/20 rounded-md border border-white backdrop-blur-sm" />
          </div>
        </div>
        <CardCarousel />
        <div className="mt-5 w-full flex justify-center">
          <CoolButton>View All Collection</CoolButton>
        </div>

        {/* background circle thingies */}
        <div className="absolute top-5 right-0 w-64 h-64 opacity-30 bg-[#ff8f1f] rounded-full blur-[100px] z-[-1]" />
        <div className="absolute top-48 right-48 w-64 h-64 opacity-30 bg-[#ff8f1f] rounded-full blur-[100px] z-[-1]" />
        <TwinkleStars frequency={30} />
      </div>

      {/* collections section */}
      <div className='max-w-[100vw] relative py-[100px] overflow-hidden'>
        <div className="mx-auto w-full flex-col justify-center items-center gap-4 inline-flex">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rotate-45 bg-white/20 rounded-md border border-white backdrop-blur-sm" />
            <h2 className="text-center text-white text-5xl font-bold font-['Bricolage Grotesque'] mx-2">Top Collections</h2>
            <div className="w-6 h-6 rotate-45 bg-white/20 rounded-md border border-white backdrop-blur-sm" />
          </div>
          <div className="text-white text-xl font-normal font-['Onest']">Explore our new NFT collection</div>
        </div>
        <CollectionCardCarousel collections={collections} className="mt-[100px] w-[70%] mx-auto" />
        <div className="my-[60px] w-full flex justify-center">
          <CoolButton>Explore More</CoolButton>
        </div>

        {/* background circle thingies */}
        <div className="absolute top-[97px] left-0 w-64 h-64 opacity-30 bg-[#ff8f1f] rounded-full blur-[100px] z-[-1]" />
        <div className="absolute bottom-48 right-48 w-64 h-64 opacity-20 bg-[#ff8f1f] rounded-full blur-[100px] z-[-1]" />
        <TwinkleStars frequency={18} />
      </div>

      {/* Features Section  */}
      <div className='max-w-[100vw] relative overflow-hidden'>
        <FeaturesSection />
      </div>

      {/* About Section */}
      <div className='max-w-[100vw] pt-[200px] relative py-[100px] overflow-hidden'>
        <div className="mx-auto w-full flex-col justify-center items-center gap-4 inline-flex">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rotate-45 bg-white/20 rounded-md border border-white backdrop-blur-sm" />
            <h2 className="text-center text-white text-5xl font-bold font-['Bricolage Grotesque'] mx-2">About</h2>
            <div className="w-6 h-6 rotate-45 bg-white/20 rounded-md border border-white backdrop-blur-sm" />
          </div>
        </div>

        <AboutStack cards={aboutCards} className="w-[85%] mx-auto" />

        {/* background circle thingies */}
        <div className="absolute -top-5 left-0 w-64 h-64 opacity-30 bg-[#ff8f1f] rounded-full blur-[100px] z-[-1]" />
        <div className="absolute top-48 left-48 w-64 h-64 opacity-30 bg-[#ff8f1f] rounded-full blur-[100px] z-[-1]" />
        <TwinkleStars frequency={13} />
      </div>

      {/* FAQ Section */}
      <div className='max-w-[100vw] px-[100px] py-[50px] relative overflow-hidden'>
        <FAQSection />

        {/* background circle thingies */}
        <div className="absolute top-[104px] left-12 w-48 h-48 opacity-30 bg-[#ff8f1f] rounded-full blur-[100px] z-[-1]" />
        <TwinkleStars frequency={7} />
      </div>

      {/* Blog Section */}
      <div className='max-w-[100vw] px-[100px] py-[100px] relative overflow-hidden'>
        <div className="h-[108px] mb-[50px] justify-between items-start inline-flex w-full">
          <div className="w-[768px] flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch text-white text-5xl font-semibold font-['Bricolage Grotesque']">Blogs</div>
            <div className="self-stretch text-[#dfdfd1] text-base font-normal font-['Onest'] leading-[30px]">The latest news, technologies, and resources from our team.</div>
          </div>
          <div className="flex justify-end w-full relative">
            <CoolButton>View All Posts</CoolButton>
          </div>
        </div>
        <BlogCarousel posts={blogPosts} />

        {/* background circle thingies */}
        <div className="absolute top-[140px] right-0 w-64 h-64 opacity-30 bg-[#ff8f1f] rounded-full blur-[100px] z-[-1]" />
        <TwinkleStars frequency={5} />
      </div>

      {/* NewsLetter Section */}
      <div className="max-w-[100vw] px-[100px] py-[100px] relative overflow-hidden">
        <NewsLetterSection />

        {/* background circle thingies */}
        <div className="absolute top-12 left-0 w-48 h-48 opacity-15 bg-[#ff8f1f] rounded-full blur-[100px] z-[-1]" />
      </div>
    </>
  )
}

export default HomePage