import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routeConfig } from 'config/routerConfig'
import { Provider } from 'react-redux'
import { store } from 'store'

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					{Object.values(routeConfig).map(({ element, path }) => (
						<Route
							key={path}
							element={element}
							path={path}
						/>
					))}
				</Routes>
			</BrowserRouter>
		</Provider>
	)
}

export default App