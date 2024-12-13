'use client'
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react'

type Theme = 'light' | 'dark'
type ThemeContextType = {
    theme: Theme
    setTheme: (theme: Theme) => void
}
type ReactNodeType = { children: ReactNode }

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: ReactNodeType) {
    const [theme, setTheme] = useState<Theme>('light')

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null
        if (savedTheme !== null) setTheme(savedTheme)
        else if (window.matchMedia('(prefers-color-scheme: dark)').matches)
            setTheme('dark')
    }, [])

    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
        document.documentElement.classList.toggle('dark', theme === 'dark')
    }, [theme])

    return <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
    </ThemeContext.Provider>
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined)
        throw new Error('useTheme must be used within a ThemeProvider')
    return context
}