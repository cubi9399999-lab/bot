'use client';

import './globals.css';
import { optimisticFont } from './fonts';
import disableDevtool from 'disable-devtool';
import React from 'react';

export default function RootLayout({ children }) {

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // disableDevtool();
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${optimisticFont.variable}`} >
        {children}
      </body>
    </html>
  );
}
