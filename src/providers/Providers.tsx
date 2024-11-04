import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient();

type ProvidersProps = {
  children?: React.ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
