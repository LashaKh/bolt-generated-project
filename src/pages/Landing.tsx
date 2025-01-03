import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Check, Users, Award, Clock, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Landing() {
  const { user } = useAuth();

  const plans = [
    {
      name: 'Starter',
      price: '$49',
      description: 'Perfect for small businesses and startups',
      features: [
        '100 leads per month',
        'Basic company information',
        'Email support',
        'Standard accuracy'
      ]
    },
    {
      name: 'Professional',
      price: '$99',
      description: 'For growing businesses with more needs',
      features: [
        '500 leads per month',
        'Advanced company data',
        'Priority email support',
        'Higher accuracy',
        'CSV exports'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations with custom needs',
      features: [
        'Unlimited leads',
        'Full company profiles',
        'Dedicated account manager',
        'Highest accuracy',
        'API access',
        'Custom integrations'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a061e] flex flex-col">
      <nav className="border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold text-white">LeadGen AI</span>
            </div>
            <div className="flex space-x-4">
              <a href="#about" className="text-gray-400 hover:text-purple-400 px-3 py-2">
                About
              </a>
              <a href="#pricing" className="text-gray-400 hover:text-purple-400 px-3 py-2">
                Pricing
              </a>
              {user ? (
                <Link
                  to="/app"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-purple-500/10"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-purple-500/10 rounded-xl mb-4">
            <Sparkles className="h-8 w-8 text-purple-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Generate Leads with AI
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Transform your business with AI-powered lead generation. Get qualified leads tailored to your product and market.
          </p>
          <div className="flex justify-center space-x-4">
            {user ? (
              <Link
                to="/app"
                className="px-8 py-3 border border-transparent rounded-lg text-lg font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Generate Leads
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="px-8 py-3 border border-transparent rounded-lg text-lg font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 border border-purple-500 rounded-lg text-lg font-medium text-purple-500 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="bg-white/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <Check className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Accurate Data</h3>
                <p className="text-gray-400">Verified and up-to-date company information.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-lg mb-4">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Trusted by Thousands</h3>
                <p className="text-gray-400">Join our growing community of satisfied users.</p>
              </div>
            </div>
          </div>
        </div>

        <div id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">About LeadGen AI</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Revolutionizing lead generation with cutting-edge AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-purple-900/30">
              <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-lg mb-4">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-400">
                We're on a mission to empower businesses with intelligent lead generation tools that save time and increase efficiency. Our AI-powered platform helps you find the right prospects faster than ever before.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-purple-900/30">
              <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-lg mb-4">
                <Award className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Technology</h3>
              <p className="text-gray-400">
                Using advanced machine learning algorithms and natural language processing, we analyze millions of data points to deliver the most relevant leads for your business.
              </p>
            </div>
          </div>
        </div>

        <div id="pricing" className="bg-white/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Pricing Plans</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Choose the plan that fits your business needs. Start small and scale as you grow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-purple-900/30">
                  <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-lg mb-4">
                    <Zap className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-3xl font-bold text-purple-400 mb-4">{plan.price}</p>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-400">
                        <Check className="h-4 w-4 text-purple-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
