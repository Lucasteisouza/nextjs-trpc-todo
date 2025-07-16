import './globals.css';
import { Providers } from '../components/provider';

export const metadata = {
  title: 'Lucas Souza - Soytware Engineer Position - Artefact',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
