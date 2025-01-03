import React from 'react';
import { Users, Award, Clock, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#0a061e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">About LeadGen AI</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Revolutionizing lead generation with cutting-edge AI technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-purple-900/30">
            <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-lg mb-4">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-400">
              We're on a mission to empower businesses with intelligent lead generation tools that save time and increase efficiency. Our AI-powered platform helps you find the right prospects faster than ever before.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-purple-900/30">
            <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-lg mb-4">
              <Award className="h-6 w-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Technology</h2>
            <p className="text-gray-400">
              Using advanced machine learning algorithms and natural language processing, we analyze millions of data points to deliver the most relevant leads for your business.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Why Choose LeadGen AI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-lg mb-4">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fast Results</h3>
              <p className="text-gray-400">Get qualified leads in minutes, not weeks.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-lg mb-4">
                <Clock className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">24/7 Availability</h3>
              <p className="text-gray-400">Our AI works around the clock to find the best leads.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-lg mb-4">
                <Award className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Proven Results</h3>
              <p className="text-gray-400">Trusted by thousands of businesses worldwide.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
