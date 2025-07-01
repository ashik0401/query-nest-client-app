import {
    createBrowserRouter,
} from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/HomePages/Home";
import Error from "../Pages/Error/Error";
import LogIn from "../Pages/LogIn/LogIn";
import Register from "../Pages/Register/Register";
import QueriesLayouts from "../Layouts/QueriesLayouts";
import AddQueries from "../Pages/QueriesPage/AddQueries";
import PrivateRoute from "./PrivateRoute";
import MyQueries from "../Pages/QueriesPage/MyQueries";
import Queries from "../Pages/QueriesPage/Queries";
import AllQueries from "../Pages/QueriesPage/AllQueries";
import QueriesDetails from "../Pages/QueriesPage/QueriesDetails";
import UpdateQueries from "../Pages/QueriesPage/UpdateQueries";
import RecommendationsLayouts from "../Layouts/RecommendationsLayouts";
import MyRecommendations from "../Pages/Recommendations/MyRecommendations";
import ForMe from "../Pages/Recommendations/ForMe";


export const router = createBrowserRouter([

    {
        path: "/",
        Component: RootLayouts,
        children: [
            {
                index: true,
                Component: Home
            },



        ]
    },
    {
        path: '/myQueries',
        element:
            <PrivateRoute>
                <QueriesLayouts />
            </PrivateRoute>,
        children: [

            {
                index: true,
                Component: MyQueries
            },
            {
                path: '/myQueries/addQueries',
                Component: AddQueries
            },
            {
                path: '/myQueries/update-query/:id',
                Component: UpdateQueries
            },


        ]
    },
    {
        path: '/recommendations',
        element:
            <PrivateRoute>
                <RecommendationsLayouts />
            </PrivateRoute>,
        children: [
            {
                index: true,
                Component: MyRecommendations
            },
            {
                path: '/recommendations/for-me',
                Component: ForMe
            }
        ]
    },
    {
        path: '/queries',
        Component: Queries,
        children: [
            {
                index: true,
                hydrateFallbackElement: <div className='flex justify-center min-h-screen items-center'>
                    <span className="loading loading-ring loading-xl "></span>
                </div>,
                loader: () => fetch('https://query-nest-server-side.vercel.app/queries'),
                Component: AllQueries
            },
            {
                path: '/queries/:id',
                element:
                    <PrivateRoute>
                        <QueriesDetails />
                    </PrivateRoute>
            }
        ]
    },
    {
        path: '/login',
        Component: LogIn
    },
    {
        path: '/register',
        Component: Register
    },

    {
        path: '*',
        Component: Error
    },

]);