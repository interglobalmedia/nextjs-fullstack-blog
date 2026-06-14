import { ThemeProvider as NextThemesProvider } from 'next-themes'
import siteMetadata from '../../data/siteMetadata'

const ThemeProvider = ({ children }) => {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme={`${siteMetadata.theme}`}
		>
			{children}
		</NextThemesProvider>
	)
}

export default ThemeProvider
