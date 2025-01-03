import React, { useState } from 'react';
import { ListChecks, Zap } from 'lucide-react';
import LeadsDataTable from '../components/LeadsDataTable';
import { GoogleSheetsEmbed } from '../components/GoogleSheetsEmbed';
import { useToast } from '../hooks/useToast';

export default function LeadsTablePage() {
  const [isEnriching, setIsEnriching] = useState(false);
  const { showToast } = useToast();

  const handleEnrichLead = async () => {
    setIsEnriching(true);
    try {
      const response = await fetch('https://hook.eu2.make.com/YOUR_WEBHOOK_ADDRESS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'enrich_lead',
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to trigger enrichment');
      }

      showToast('Lead enrichment started successfully!', 'success');
    } catch (error) {
      console.error('Error enriching lead:', error);
      showToast('Failed to start lead enrichment', 'error');
    } finally {
      setIsEnriching(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-2 bg-purple-500/10 rounded-xl mb-4">
          <ListChecks className="h-6 w-6 text-purple-400" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Generated Leads
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Review and manage your AI-generated leads. Each lead is carefully selected
          based on your product specifications and target market.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-purple-900/30">
        <LeadsDataTable />
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Google Sheets View</h2>
        <GoogleSheetsEmbed 
          spreadsheetId="2PACX-1vRtU7xB3tE4zKIveNQHZbDPFZ6B2YBdBYtx_2ZSgmS8hOaRqfZO8j7Pap0YoQVY-hiYq-3rNCPtCg6Z"
        />
        
        {/* Enrich Lead Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleEnrichLead}
            disabled={isEnriching}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEnriching ? (
              <>
                <Zap className="animate-pulse h-5 w-5 mr-2" />
                Enriching Lead...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-2" />
                Enrich Lead
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
