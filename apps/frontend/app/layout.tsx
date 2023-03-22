'use client';

import { ChakraProvider, Container, Spacer } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';
import { NavBar } from '../components/Navbar/navbar';
import './globals.css';
import { Inter } from '@next/font/google';
import Footer from '../components/Footer/Footer';
import { RecoilRoot } from 'recoil';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>
        <div className="backGBlur"></div>
        <div className="backGWrapper">
          {/* <div className="backGEllipse"></div> */}
          <div className="backG"></div>
        </div>
        <RecoilRoot>
          <CacheProvider>
            <ChakraProvider>
              <Container
                fontFamily={'Inter'}
                maxW="container.xl"
                py={14}
                color="white"
              >
                <NavBar />
                {children}
                <Spacer height={20} />
                <Footer />
              </Container>
            </ChakraProvider>
          </CacheProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
