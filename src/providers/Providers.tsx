import { ThemeProvider } from 'next-themes';

type ProvidersProps = {
  children?: React.ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <ThemeProvider defaultTheme="light">{children}</ThemeProvider>;
};

export default Providers;
