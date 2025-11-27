import React from 'react';
import Welcome from '../pages/client/main/Welcome';
import Main from '../pages/client/main/Main';
import { Route, Routes } from 'react-router-dom';
import RentMovie from '../pages/client/vip/RentMovie';
import Categories from '../pages/client/categories/Categories';
import MovieDetail from '../pages/client/detail/MovieDetail';
import PlayMovie from '../pages/client/detail/PlayMovie';
import ListMovie from '../pages/client/movie theater/ListMovie';
import ListMovieCate from '../components/client/movieByCate/ListMovieCate';
import MyDetail from '../pages/client/detail/MyDetail';
import PlayMyMovie from '../pages/client/detail/PlayMyMovie';
import SubcriptionPlan from '../pages/client/vip/SubcriptionPlan';
import PaymentPage from '../pages/client/vip/PaymentPage';
import Pay from '../pages/client/vip/Pay';
import AccountPage from '../pages/client/accountPage/AccountPage';
import FavoriteMovie from '../pages/client/favorite/FavoriteMovie';
import AccountInfor from '../pages/client/accountPage/components/AccountInfor';
import PlanManage from '../pages/client/accountPage/components/PlanManage';
import RentMovieLibrary from '../pages/client/accountPage/components/RentMovieLibrary';
import MoviesList from '../pages/client/movieList/MoviesList';
import ListSeriMovie from '../pages/client/movie theater/ListSeriMovie';
import ListAnimeMovie from '../pages/client/movie theater/ListAnimeMovie';
const router = [
    { path: '/', element: <Welcome /> },
    {path: '/main', element: <Main />},
    {path: '/main/categories', element: <Categories />},
    {path: '/main/rentmovie', element: <RentMovie />},
    {path: '/movie/:slug', element: <MovieDetail />},
    {path: '/play-movie/:slug', element: <PlayMovie />},
    {path: '/main/list-movie/:typeList', element: <ListMovie />},
    {path: '/main/free-movie/:typeList', element: <ListAnimeMovie/>},
    {path: '/main/movies/:id', element: <ListMovieCate />},
    {path: '/main/movies/detail/:id', element: <MyDetail/>},
    {path: '/play-my-movie/:id', element: <PlayMyMovie/>},
    {path: '/main/vip', element: <SubcriptionPlan/>},
    {path: '/payment/:id', element: <PaymentPage/>},
    {path: '/payment/rent-movie/:id', element: <RentMovie/>},
    {path: '/payment/pay/:id', element: <Pay/>},
    {path: '/main/account', element: <AccountPage/>,
       subRoutes : [
        {path: '/main/account', element: <AccountInfor/>},
        {path: '/main/account/plan-manage', element: <PlanManage/>},
        {path: '/main/account/rent-movies-library', element: <RentMovieLibrary/>},
       ]
    },
    {path: '/main/account/favorite', element: <FavoriteMovie/>},
    {path: '/main/account/movieList', element: <MoviesList/>},
    
    
];
// Recursive function to render both top-level and nested routes
function renderRoutes(routeArray) {
    return routeArray.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
            {route.subRoutes && renderRoutes(route.subRoutes)}
        </Route>
    ));
}

function ClienRouters() {
    return (
        <div>
            <Routes>
                {renderRoutes(router)}
            </Routes>
            
        </div>
    );
}

export default ClienRouters;