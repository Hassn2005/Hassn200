import { Helmet } from 'react-helmet-async';
import About from './components/About';
import Contact from './components/Contact';
import Features from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Location from './components/Location';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';

function App() {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Dantil — Elegant Accessories in Daraa</title>
        <meta
          name="description"
          content="Discover Dantil, a premium boutique accessories brand in Daraa, Syria, blending refined femininity, thoughtful details, and timeless elegance."
        />
        <meta
          name="keywords"
          content="Dantil, accessories, boutique, Daraa, women's accessories, elegant jewelry, premium fashion details"
        />
        <meta name="theme-color" content="#f4e2d8" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dantil — Elegant Accessories in Daraa" />
        <meta
          property="og:description"
          content="Luxury women’s accessories and boutique-inspired styling in Daraa, Syria."
        />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1617038220319-276d3cfab534?auto=format&fit=crop&w=1200&q=80"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dantil — Elegant Accessories in Daraa" />
        <meta
          name="twitter:description"
          content="Premium women’s accessories with editorial elegance and a boutique soul."
        />
      </Helmet>

      <div className="min-h-screen bg-[#f9f1ee] text-[#2d1d1d] antialiased">
        <Navbar />

        <main className="overflow-x-hidden">
          <Hero />
          <About />
          <Features />
          <Location />
          <Contact />
          <Welcome />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
