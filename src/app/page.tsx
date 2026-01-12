import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import DashboardMapSection from '@/components/IndonesiaMap';
import EfficiencySection from '@/components/EfficiencySection';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <DashboardMapSection />
      <EfficiencySection />
      <InfoSection />
      <Footer />
    </main>
  );
}
