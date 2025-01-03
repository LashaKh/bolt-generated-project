import React, { useState, useEffect } from 'react';

interface ResizeHandleProps {
  onResize: (delta: number) => void;
  isColumn?: boolean;
  minSize?: number;
  maxSize?: number;
  parentRef: React.RefObject<HTMLElement>;
}

export function ResizeHandle({ 
  onResize, 
  isColumn = true, 
  minSize = 50, 
  maxSize = 800,
  parentRef
}: ResizeHandleProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [startSize, setStartSize] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !parentRef.current) return;
      
      const currentPosition = isColumn ? e.clientX : e.clientY;
      const delta = currentPosition - startPosition;
      const newSize = startSize + delta;

      if (newSize >= minSize && newSize <= maxSize) {
        onResize(delta);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startPosition, startSize, isColumn, minSize, maxSize, onResize, parentRef]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!parentRef.current) return;

    const rect = parentRef.current.getBoundingClientRect();
    setStartPosition(isColumn ? e.clientX : e.clientY);
    setStartSize(isColumn ? rect.width : rect.height);
    setIsDragging(true);
  };

  return (
    <div
      className={`absolute ${
        isColumn 
          ? 'cursor-col-resize right-[-4px] top-0 w-2 h-full hover:bg-purple-500/20 active:bg-purple-500/40' 
          : 'cursor-row-resize bottom-[-4px] left-0 h-2 w-full hover:bg-purple-500/20 active:bg-purple-500/40'
      } border-purple-500 z-20 ${
        isDragging ? 'bg-purple-500/40' : ''
      } transition-colors`}
      onMouseDown={handleMouseDown}
      role="separator"
      aria-orientation={isColumn ? "vertical" : "horizontal"}
      aria-label={isColumn ? "Column resize handle" : "Row resize handle"}
      tabIndex={0}
    />
  );
}
