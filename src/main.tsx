import App from './App.tsx'
import store from './redux/store.ts'

import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.css'
import '@mantine/core/styles.css';
import themeOverride from './theme/overrideTheme.ts'



createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <MantineProvider theme={themeOverride}>
            <Router>
                <App />
            </Router>
        </MantineProvider>
    </Provider>
)
