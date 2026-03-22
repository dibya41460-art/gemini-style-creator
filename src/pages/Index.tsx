import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import GoldSection from "@/components/GoldSection";
import DiamondSection from "@/components/DiamondSection";
import BridalSection from "@/components/BridalSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <GoldSection />
      <DiamondSection />
      <BridalSection />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Index;
