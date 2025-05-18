import React from 'react';
import { Brain, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="text-secondary w-6 h-6" />
              <span className="gradient-text font-bold text-lg">SpaceCard</span>
            </div>
            <p className="text-neutral-400 text-sm mb-4">
              Master your knowledge with the science of spaced repetition.
              Effective, efficient learning for everyone.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-400 hover:text-secondary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-secondary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-secondary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-secondary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Testimonials', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Blog', 'Documentation', 'Support', 'API'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Careers', 'Privacy', 'Terms'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8">
          <p className="text-neutral-500 text-sm text-center">
            © {new Date().getFullYear()} SpaceCard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;