import About from "../components/About";
import Banner from "../components/Banner";
import Blog from "../components/Blog";
import Companies from "../components/Companies";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import NavbarPage from "../components/NavbarPage";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import Service from "../components/Service";
import Testimonial from "../components/Testimonial";

export { generateMetadata } from './generateMetadata';

export default function Home() {
  return (
    <>
      <NavbarPage />
      <Banner />
      <Service />
      <Features />
      <About />
      <Pricing />
      <FAQ />
      <Testimonial />
      <Companies />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}