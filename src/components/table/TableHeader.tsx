import React, { useRef } from 'react';
import { ResizeHandle } from './ResizeHandle';

interface TableHeaderProps {
  label: string;
  width: number;
  onResize: (delta: number) => void;
}

export function TableHeader({ label, width, onResize }: TableHeaderProps) {
  const headerRef = useRef<HTMLTableCellElement>(null);

  return (
    <th 
      ref={headerRef}
      className="relative py-2 px-3 text-left text-sm font-semibold text-purple-400 border-r border-b border-purple-900/30 sticky top-0 bg-[#0a061e]/95 backdrop-blur select-none transition-all duration-75"
      style={{ width }}
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
      </div>
      <ResizeHandle 
        onResize={onResize} 
        isColumn={true} 
        minSize={100} 
        maxSize={600}
        parentRef={headerRef}
      />
    </th>
  );
}
