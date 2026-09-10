import React, { useEffect } from 'react';
import { setPageTitle } from '@/lib/utils';
import { HeroSection } from '@/components/home/HeroSection';
import { VisualDiarySection } from '@/components/home/VisualDiarySection';
import { PopularDestinationsSection } from '@/components/home/PopularDestinationsSection';
import { VideoInspirationSection } from '@/components/home/VideoInspirationSection';
import { CallToActionSection } from '@/components/home/CallToActionSection';

export const HomePage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Discover Places That Feel Like Heaven');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* 1. Hero Section (Image 2 & 3 inspired) */}
      <HeroSection />

      {/* 2. My Visual Diary Photo & Video Gallery (Image 1 inspired) */}
      <VisualDiarySection />

      {/* 3. Popular Destinations / Tours Grid (Image 3 & 4 inspired) */}
      <PopularDestinationsSection />

      {/* 4. Discover the World in a New Way Video Teasers (Image 4 & 5 inspired) */}
      <VideoInspirationSection />

      {/* 5. Call To Action Banner (Image 5 inspired) */}
      <CallToActionSection />
    </div>
  );
};
