import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import StatsTicker from "@/components/landing/StatsTicker";
import Mission from "@/components/landing/Mission";
import Founders from "@/components/landing/Founders";
import HowItWorks from "@/components/landing/HowItWorks";
import Countries from "@/components/landing/Countries";
import Membership from "@/components/landing/Membership";
import News from "@/components/landing/News";
import Testimonials from "@/components/landing/Testimonials";
import InterviewSection from "@/components/landing/InterviewSection";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import AIChatWidget from "@/components/landing/AIChatWidget";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <StatsTicker />
      <Mission />
      <Founders />
      <HowItWorks />
      <Countries />
      <Membership />
      <News />
      <Testimonials />
      <InterviewSection />
      <CTA />
      <Footer />
      <AIChatWidget />
    </>
  );
}
