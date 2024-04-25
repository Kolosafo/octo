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
          <main className='relative min-h-screen w-full'>{children}</main>
        </body>
      </ReduxProvider>
    </html>
  );
};

export default BaseAppWrapper;
