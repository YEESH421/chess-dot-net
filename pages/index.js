import { useState } from 'react';
import Script from 'next/script';
import Head from 'next/head';
import Layout from '../components/layout';
import Board from '../components/board';
import { NextUIProvider } from '@nextui-org/react';
import { Grid } from '@nextui-org/react';
import { Container, Row, Col } from '@nextui-org/react';
import { createTheme } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: 'light',
})

const darkTheme = createTheme({
  type: 'dark',
})

export default function HomePage() {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
    >
      <NextUIProvider>
        <Layout>
          <Container >
            <Row justify='center'>
              <h1>Welcome to Chess.net</h1>
            </Row>
            <Row justify='center'>
              <Board></Board>
            </Row>
          </Container>
        </Layout>
      </NextUIProvider>
    </NextThemesProvider>
  );
}