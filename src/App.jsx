import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AgenticFeature from './components/AgenticFeature';
import KnowledgeFeature from './components/KnowledgeFeature';
import EmotionalFeature from './components/EmotionalFeature';
import FeatureGrid from './components/FeatureGrid';
import Capabilities from './components/Capabilities';
import Community from './components/Community';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#3c96ca] selection:text-white">
      <Navbar />
      <Hero />
      <AgenticFeature />
      <KnowledgeFeature />
      <EmotionalFeature />
      <FeatureGrid />
      <Capabilities />
      <Community />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
