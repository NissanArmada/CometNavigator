import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import ProductPreviewSection from "./components/ProductPreviewSection";
import HowItWorks from "./components/HowItWorks";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      {/* Offset for fixed navbar */}
      <main className="pt-[73px]">
        <HeroSection />
        <FeatureSection />
        <ProductPreviewSection />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
