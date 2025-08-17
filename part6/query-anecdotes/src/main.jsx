import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificiationContextProvider } from './NotificationContext'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificiationContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NotificiationContextProvider>
)