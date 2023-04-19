
import Layout from '../components/layout';
import Game from '../components/game';
import { Container, Row, createTheme, Switch, NextUIProvider, Grid, Navbar, Text } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { SunIcon } from '../public/assets/SunIcon';
import { MoonIcon } from '../public/assets/MoonIcon';

export default function HomePage() {
  return (
      <Layout>
          <div style={{marginTop: '2vh'}}>
            <Game/>
          </div> 
      </Layout>

  );
}