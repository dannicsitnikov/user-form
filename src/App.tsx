import { Container, MantineProvider, Paper, Title } from '@mantine/core';
import '@mantine/core/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { FirstStepPage } from './pages/FirstStep';
import { SecondStepPage } from './pages/SecondStep';
import { ThirdStepPage } from './pages/ThirdStep';

const App = () => (
  <MantineProvider defaultColorScheme='dark'>
    <BrowserRouter>
      <ModalsProvider>
        <Container size='xs' py='xl'>
          <Paper withBorder shadow='md' p='xl' radius='md'>
            <Title order={2} ta='center' mb='lg'>
              Оформление займа
            </Title>
            <Routes>
              <Route path='/step1' element={<FirstStepPage />} />
              <Route path='/step2' element={<SecondStepPage />} />
              <Route path='/step3' element={<ThirdStepPage />} />
              <Route path='/' element={<Navigate to='/step1' replace />} />
              <Route path='*' element={<Navigate to='/step1' replace />} />
            </Routes>
          </Paper>
        </Container>
      </ModalsProvider>
    </BrowserRouter>
  </MantineProvider>
);

export default App;
