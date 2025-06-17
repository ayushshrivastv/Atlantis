"use client";

import React from 'react';
import Image from 'next/image';

export function OpenAPILogo({ width = 200, height = 80, className = "" }) {
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
      <Image
        src="/images/openapi-logo.png"
        alt="OpenAPI Logo"
        width={width}
        height={height}
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}
