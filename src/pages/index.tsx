import { Inter } from 'next/font/google';
import MainPage from './main_page';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen w-full">
      <MainPage />
    </main>
  );
}
