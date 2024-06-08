import { Inter } from 'next/font/google';
import MainPage from './main_page';
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <Navbar />
      <MainPage />
    </main>
  );
}
