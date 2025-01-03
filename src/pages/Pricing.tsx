import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#0a061e] py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-400">Scale up as your business grows</p>
        </div>

        {/* Vertical Pricing Plans */}
        {/* Starter Plan */}
        <div className="mb-8 bg-gradient-to-r from-purple-900/20 to-transparent p-1 rounded-xl hover:from-purple-600/30 transition-all">
          <div className="bg-[#0a061e] rounded-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Starter</h2>
                <div className="mt-2 text-purple-400 text-3xl font-bold">$49<span className="text-sm text-gray-400">/month</span></div>
              </div>
              <button className="bg-purple-600/20 text-purple-400 px-6 py-2 rounded-full hover:bg-purple-600 hover:text-white transition-all flex items-center group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-purple-400 mr-2" />
                  100 leads/month
                </div>
                <div className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-purple-400 mr-2" />
                  Basic company data
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-purple-400 mr-2" />
                  Email support
                </div>
                <div className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-purple-400 mr-2" />
                  Standard accuracy
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Plan */}
        <div className="mb-8 bg-gradient-to-r from-purple-600/30 to-transparent p-1 rounded-xl hover:from-purple-600/50 transition-all">
          <div className="bg-[#0a061e] rounded-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-white">Professional</h2>
                  <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">Popular</span>
                </div>
                <div className="mt-2 text-purple-400 text-3xl font-bold">$99<span className="text-sm text-gray-400">/month</span></div>
              </div>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-all flex items-center group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-purple-400 mr-2" />
                  500 leads/month
                </div>
                <div className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-purple-400 mr-2" />
                  Advanced company data
                </div>
                <div className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-purple-400 mr-2" />
                  Priority support
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-purple-400 mr-2" />
                  95% accuracy
                </div>
                <div className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-purple-400 mr-2" />
                  CSV exports
                </div>
                <div className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-purple-400 mr-2" />
                  API access
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="mb-8 bg-gradient-to-r from-purple-900/20 to-transparent p-1 rounded-xl hover:from-purple-600/30 transition-all">
          <div className="bg-[#0a061e] rounded-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Enterprise</h2>
                <div className="mt-2 text-purple-400 text-3xl font-bold">Custom<span className="text-sm text-gray-400"> pricing</span></div>
              </div>
              <button className="bg-purple-600/20 text-purple-400 px-6 py-2 rounded-full hover:bg-purple-600 hover:text-white transition-all flex items-center group">
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-purple-400 mr-2" />
                  Unlimited leads
                </div>
                <div className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-purple-400 mr-2" />
                  Full company profiles
                </div>
                <div className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-purple-400 mr-2" />
                  24/7 priority support
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-purple-400 mr-2" />
                  99.9% accuracy
                </div>
                <div className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-purple-400 mr-2" />
                  Custom integrations
                </div>
                <div className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-purple-400 mr-2" />
                  Dedicated manager
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <p className="text-center text-gray-400 mt-12">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </div>
  );
}
