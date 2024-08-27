import React from 'react';
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Import images
import binocularsImg from '../assets/binoculars.png';
import bookImg from '../assets/info.png';
import megaphoneImg from '../assets/social-media-marketing.png';
import rightSideImage from '../assets/bitcoin-2714196_processed.jpg'; // Import your image

const Home: React.FC = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    });
  }, [controls]);

  return (
    <div>
      <header className="bg-black text-white h-screen flex items-center">
        <div className="container mx-auto flex h-full">
          {/* Left Column */}
          <div className="w-1/2 flex items-center justify-start pl-16">
            <div className="text-left">
            <span className='animate-fadeInUp text-4xl font-bold opacity-0'>AptFund</span>
              <h1 className="animate-fadeInUp text-4xl font-bold mb-4 opacity-0">
                Crowdfunding, Simplified <br />and Secured
              </h1>
              <p className="animate-fadeInUp text-lg leading-relaxed opacity-0">
                Welcome to AptFund, the future of crowdfunding—where raising funds is secure, transparent, and completely hassle-free.
                Harness the power<br />of blockchain to turn your ideas into reality with a platform designed for trust, efficiency, and seamless project support.<br />
                Your vision, our mission,<br />
                a brighter future together.
              </p>
            </div>
          </div>
          {/* Right Column */}
          <div className="w-1/2 flex items-center justify-center">
            <img src={rightSideImage} alt="Description" className="w-full h-auto max-w-md" />
          </div>
        </div>
      </header>

      <section className="bg-indigo-900 text-white py-16">
        <div className="container mx-auto">
          <div className="flex justify-between space-x-8">
            {/* Explore Column */}
            <div className="w-1/3 text-center flex flex-col items-center">
              <div className="mb-4">
                <img src={binocularsImg} alt="Explore" className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">Explore</h3>
              <p>Discover crowdfunding campaigns</p>
            </div>

            {/* How It Works Column */}
            <div className="w-1/3 text-center flex flex-col items-center">
              <div className="mb-4">
                <img src={bookImg} alt="How It Works" className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">How It Works</h3>
              <p>Get introduced to crowdfunding and learn how to use AptFund</p>
            </div>

            {/* Start Your Campaign Column */}
            <div className="w-1/3 text-center flex flex-col items-center">
              <div className="mb-4">
                <img src={megaphoneImg} alt="Start Your Campaign" className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">Start Your Campaign</h3>
              <p>Walkthrough the steps before you start creating your campaign</p>
            </div>
          </div>
        </div>
      </section>

      <motion.section
        className="bg-black text-white h-screen flex items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold">Our Vision</h2>
          <p className="mt-4">We aim to revolutionize crowdfunding with transparency and trust.</p>
        </div>
      </motion.section>
      {/* Add more sections as needed */}
    </div>
  );
};

export default Home;