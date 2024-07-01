import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useEffect, useState } from 'react'
import siteMetadata from '../../data/siteMetadata'


const ThemeProvider = ({ children }) => {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (

    <NextThemesProvider attribute="class" defaultTheme={`${siteMetadata.theme}`}>
      {children}
    </NextThemesProvider>

  )

}


export default ThemeProvider;