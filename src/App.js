import { HashRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Form from "./components/Form/Form"
import Table from "./components/Table"
import Edit from "./components/Edit/Edit"
import { createContext, useState, useMemo } from "react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { ColorModeContext, useMode } from "./theme"

import './css/main.css'

export const isOpenSidebar = createContext({
	sidebarOpen: false,
	setUserName: () => {},
})


const App = () => {

	const [sidebarOpen, setSidebarOpen] = useState(false)

	const value = useMemo(
		() => ({ sidebarOpen, setSidebarOpen }), 
		[sidebarOpen]
	)

	const [theme, colorMode] = useMode()

	return ( 
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
					<isOpenSidebar.Provider value={value}>
						<HashRouter>
							<NavBar/>
								<Routes>
									<Route path="/" element={<Form/>} />
									<Route path="/table" element={<Table/>} />
									<Route path="/edit/:id" element={<Edit/>} />
								</Routes>
						</HashRouter>
					</isOpenSidebar.Provider>
			</ThemeProvider>
    	</ColorModeContext.Provider>
		)
}
 
export default App
