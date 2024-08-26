import React from 'react';
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

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
    <div className="pt-20">
      <header className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Welcome to AptFund</h1>
          <p className="mt-4">The best crowdfunding platform on Aptos blockchain.</p>
        </div>
      </header>
      <motion.section
        className="container mx-auto py-20"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
      >
        <h2 className="text-3xl font-bold text-center">How AptFund Works</h2>
        <p className="mt-4 text-center">AptFund allows you to start and support campaigns easily.</p>
        {/* Add more interactive content here, such as cards, animations, etc. */}
      </motion.section>
      {/* Additional sections with animations */}
    </div>
  );
};

export default Home;
