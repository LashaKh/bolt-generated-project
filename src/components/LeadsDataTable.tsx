import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { TableCell } from './table/TableCell';
import { TableHeader } from './table/TableHeader';
import { TableRowHeader } from './table/TableRowHeader';
import { isInRange } from '../lib/utils';
import { useToast } from '../hooks/useToast';

interface Lead {
  id: string;
  company_name: string;
  website: string;
  description: string;
  company_address: string;
  company_linkedin: string;
  company_email: string;
  company_email_2: string;
  company_facebook: string;
  company_instagram: string;
  company_twitter: string;
  company_phone: string;
  company_phone_2: string;
  created_at: string;
  last_updated: string;
}

const COLUMNS = [
  { key: 'company_name', label: 'Company', type: 'text' },
  { key: 'company_address', label: 'Address', type: 'text' },
  { key: 'description', label: 'Description', type: 'text' },
  { key: 'company_linkedin', label: 'LinkedIn', type: 'url' },
  { key: 'company_email', label: 'Email', type: 'email' },
  { key: 'company_email_2', label: 'Email 2', type: 'email' },
  { key: 'company_facebook', label: 'Facebook', type: 'url' },
  { key: 'company_instagram', label: 'Instagram', type: 'url' },
  { key: 'company_twitter', label: 'Twitter', type: 'url' },
  { key: 'company_phone', label: 'Phone', type: 'tel' },
  { key: 'company_phone_2', label: 'Phone 2', type: 'tel' },
];

export default function LeadsDataTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [columnWidths, setColumnWidths] = useState<number[]>(
    COLUMNS.map(() => 150)
  );
  const [rowHeights, setRowHeights] = useState<number[]>([]);
  const [editingCell, setEditingCell] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const { showToast } = useToast();

  // Initialize row heights
  useEffect(() => {
    setRowHeights(Array(leads.length).fill(40));
  }, [leads.length]);

  // Handle column resize
  const handleColumnResize = (index: number, delta: number) => {
    setColumnWidths(prev => {
      const newWidths = [...prev];
      newWidths[index] = Math.max(100, newWidths[index] + delta);
      return newWidths;
    });
  };

  // Handle row resize
  const handleRowResize = (index: number, delta: number) => {
    setRowHeights(prev => {
      const newHeights = [...prev];
      newHeights[index] = Math.max(40, newHeights[index] + delta);
      return newHeights;
    });
  };

  // Fetch leads
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setLeads(data || []);
      } catch (error) {
        console.error('Error fetching leads:', error);
        setError('Failed to load leads');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // Update lead
  const handleUpdate = async (id: string, field: keyof Lead, value: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ [field]: value })
        .eq('id', id);

      if (error) throw error;

      setLeads(current =>
        current.map(lead =>
          lead.id === id ? { ...lead, [field]: value } : lead
        )
      );
    } catch (error) {
      console.error('Error updating lead:', error);
      setError('Failed to update lead');
      setTimeout(() => setError(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-400 border-r-transparent"></div>
        <p className="mt-4 text-gray-400">Loading leads...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table
        ref={tableRef}
        className="min-w-full divide-y divide-purple-900/30"
        aria-label="Leads table"
      >
        <thead>
          <tr>
            <th className="w-12 py-2 border-r border-b border-purple-900/30 sticky left-0 top-0 bg-[#0a061e]/95 backdrop-blur z-10" />
            {COLUMNS.map(({ key, label }, index) => (
              <TableHeader
                key={key}
                label={label}
                width={columnWidths[index]}
                onResize={(delta) => handleColumnResize(index, delta)}
              />
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-900/30">
          {leads.map((lead, rowIndex) => (
            <tr key={lead.id} className="hover:bg-purple-500/5">
              <TableRowHeader
                index={rowIndex}
                isSelected={selectedCells.some(([row]) => row === rowIndex)}
                onClick={() => setSelectedCells([[rowIndex, 0]])}
              />
              {COLUMNS.map(({ key, type }, colIndex) => (
                <TableCell
                  key={key}
                  value={lead[key as keyof Lead] || ''}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  width={columnWidths[colIndex]}
                  height={rowHeights[rowIndex]}
                  isSelected={selectedCells.some(([row, col]) => row === rowIndex && col === colIndex)}
                  isEditing={editingCell?.[0] === rowIndex && editingCell?.[1] === colIndex}
                  onChange={(value) => handleUpdate(lead.id, key as keyof Lead, value)}
                  onSelect={(row, col, isShiftKey) => {
                    if (isShiftKey) {
                      const newSelection = [...selectedCells, [row, col]];
                      setSelectedCells(newSelection);
                    } else {
                      setSelectedCells([[row, col]]);
                    }
                  }}
                  onEditStart={() => setEditingCell([rowIndex, colIndex])}
                  onEditEnd={() => setEditingCell(null)}
                  onRowResize={(delta) => handleRowResize(rowIndex, delta)}
                  type={type}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
