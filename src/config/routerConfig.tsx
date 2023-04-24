import { RouteProps } from 'react-router-dom'
import MainPage from 'pages/MainPage'
export enum AppRoutes {
  MAIN = 'main',
  DETAILS = 'details',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',
	[AppRoutes.DETAILS]: '/details',
	[AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage />,
	},
	[AppRoutes.DETAILS]: {
		path: RoutePath.main,
		element: <MainPage />,
	},
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.main,
		element: <MainPage />,
	},
}