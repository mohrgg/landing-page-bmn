import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AchievementsSection from '@/components/AchievementsSection';
import DashboardMapSection from '@/components/IndonesiaMap';
import PerformanceSection from '@/components/PerformanceSection';
import EfficiencySection from '@/components/EfficiencySection';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AchievementsSection />
      <DashboardMapSection />
      <PerformanceSection />
      <EfficiencySection />
      <InfoSection />
      <Footer />
      <ChatWidget />
    </main>
  );
}
