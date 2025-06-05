"use client";

import React from 'react';

export function OpenAPILogo({ width = 200, height = 80, className = "" }) {
  // This component renders the cleverly logo exactly as shown in the attachment
  return (
    <div 
      className={`relative ${className}`} 
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <style jsx global>{`        
        .openapi-logo-text {
          font-family: -apple-system, BlinkMacSystemFont, 'San Francisco', 'SF Pro Text', 'SF Pro Display', system-ui, sans-serif;
          font-style: normal;
          color: white;
          font-weight: 300;
          letter-spacing: -0.02em;
          text-transform: none;
        }
      `}</style>
      <span 
        className="openapi-logo-text"
        style={{ 
          fontSize: `${height * 0.77}px`,
          lineHeight: 1,
          letterSpacing: '-0.02em'
        }}
      >
        OpenAPI
      </span>
    </div>
  );
}
