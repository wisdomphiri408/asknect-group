// app/ThemeProvider.js
import { cookies } from 'next/headers';

export default function ThemeProvider({ children }) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme')?.value || 'light'; // Default to light mode

  return (
    <div className={theme}>
      {children}
    </div>
  );
}