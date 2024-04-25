import Sidebar from '@/components/sidebar';
import { ReduxProvider } from '@/redux/provider';
import React from 'react';

const BaseAppWrapper = ({
  children,
  fontFamily,
}: {
  children: React.ReactNode;
  fontFamily: any;
}) => {
  return (
    <html lang='en'>
      <ReduxProvider>
        <body className={fontFamily}>
          <div className='grid grid-cols-[auto_1fr]'>
            <Sidebar />
            <main className='relative min-h-screen w-full'>
              {children}
            </main>
          </div>
        </body>
      </ReduxProvider>
    </html>
  );
};

export default BaseAppWrapper;
