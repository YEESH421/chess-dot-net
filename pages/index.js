
import Layout from '../components/layout';
import Game from '../components/game';
import { Container, Row, createTheme, Switch, NextUIProvider } from '@nextui-org/react';
import { useTheme } from 'next-themes'

export default function HomePage() {
  const lightTheme = createTheme({
    type: 'light',
  })

  const darkTheme = createTheme({
    type: 'dark',
  })
  const { theme, setTheme } = useTheme()
  return (
    <NextUIProvider theme={theme == 'dark' ? darkTheme : lightTheme}>
      <Layout>
        <Container >
          <Row>
          Dark Theme
          <Switch checked={theme == 'dark'} onChange={e => theme == 'dark' ? setTheme('light') : setTheme('dark')} data-test-id='theme-selector'/>
          </Row>
          <Row justify='center'>
            <h1>Welcome to Chess.net</h1>
          </Row>
          <Row justify='center'>
            <Game/>
          </Row>
        </Container>
      </Layout>
    </NextUIProvider>
  );
}