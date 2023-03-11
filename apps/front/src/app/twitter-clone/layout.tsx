'use client';
import { RecoilRoot } from 'recoil';

import SessionProviderWrapper from './components/SessionProviderWrapper';
import './globals.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <SessionProviderWrapper>{children}</SessionProviderWrapper>
    </RecoilRoot>
  );
};

export default Layout;
