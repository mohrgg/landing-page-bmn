import HeroSection from '@/components/HeroSection';
import AchievementsSection from '@/components/AchievementsSection';
import DashboardMapSection from '@/components/IndonesiaMap';
import PerformanceSection from '@/components/PerformanceSection';
import EfficiencySection from '@/components/EfficiencySection';
import NewsSection from '@/components/NewsSection';
import GallerySection from '@/components/GallerySection';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <AchievementsSection />
      <DashboardMapSection />
      <PerformanceSection />
      <EfficiencySection />
      <NewsSection />
      <GallerySection />
      <Footer />
      <ChatWidget />
    </main>
  );
}
