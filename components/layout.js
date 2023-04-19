import styles from './layout.module.css';
import { Container, Row, createTheme, Switch, NextUIProvider, Grid, Navbar, Text } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { SunIcon } from '../public/assets/SunIcon';
import { MoonIcon } from '../public/assets/MoonIcon';

export default function Layout({ children }) {
  const lightTheme = createTheme({
    type: 'light',
  })
  
  const darkTheme = createTheme({
    type: 'dark',
  })
  const { theme, setTheme } = useTheme()
  return (
    <NextUIProvider theme={theme == 'dark' ? darkTheme : lightTheme}>
      <Navbar isBordered isCompact variant='floating' css={{ padding: 0 }}>
        <Navbar.Brand>
          <Text b color="inherit" size="$3xl" hideIn="xs">
            Chess.net
          </Text>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Item >
            <Switch checked={theme == 'dark'} onChange={e => theme == 'dark' ? setTheme('light') : setTheme('dark')} iconOn={<MoonIcon filled />}
              iconOff={<SunIcon filled />} />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      {children}
    </NextUIProvider>)
}