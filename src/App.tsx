import { QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import { queryClient } from './lib/query-client'
import { AppRoutes } from './routes'

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 6,
          colorPrimary: '#003f2b',
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App
