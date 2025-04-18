import React from 'react';
import Welcome from '../pages/client/main/Welcome';
import Main from '../pages/client/main/Main';
import { Route, Routes } from 'react-router-dom';
import RentMovie from '../pages/client/vip/RentMovie';
import Categories from '../pages/client/categories/Categories';
import NewMovie from '../pages/client/newmovie/NewMovie';
import MovieDetail from '../pages/client/detail/MovieDetail';
import PlayMovie from '../pages/client/detail/PlayMovie';
import ListMovie from '../pages/client/movie theater/ListMovie';
import ListMovieCate from '../pages/client/movie theater/ListMovieCate';
import MyDetail from '../pages/client/detail/MyDetail';
import PlayMyMovie from '../pages/client/detail/PlayMyMovie';
import SubcriptionPlan from '../pages/client/vip/SubcriptionPlan';
import PaymentPage from '../pages/client/vip/PaymentPage';
import Pay from '../pages/client/vip/Pay';
import MovieSearch from '../components/MovieSearch';
import AccountPage from '../pages/client/accountPage/AccountPage';
import FavoriteMovie from '../pages/client/accountPage/FavoriteMovie';
const router = [
    { path: '/', element: <Welcome /> },
    {path: '/main', element: <Main />},
    {path: '/main/categories', element: <Categories />},
    {path: '/main/newmovie', element: <NewMovie />},
    {path: '/main/rentmovie', element: <RentMovie />},
    {path: '/movie/:slug', element: <MovieDetail />},
    {path: '/play-movie/:slug', element: <PlayMovie />},
    {path: '/main/movies', element: <ListMovie />},
    {path: '/main/movies/:id', element: <ListMovieCate />},
    {path: '/main/movies/detail/:id', element: <MyDetail/>},
    {path: '/play-my-movie/:id', element: <PlayMyMovie/>},
    {path: '/main/vip', element: <SubcriptionPlan/>},
    {path: '/payment/:id', element: <PaymentPage/>},
    {path: '/payment/rent-movie/:id', element: <RentMovie/>},
    {path: '/payment/pay/:id', element: <Pay/>},
    {path: '/main/tim-kiem', element: <MovieSearch />},
    {path: '/main/account', element: <AccountPage/>},
    {path: '/main/account/favorite', element: <FavoriteMovie/>},
];

function ClienRouters(props) {
    return (
        <div>
            <Routes>
                {router.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
            
        </div>
    );
}

export default ClienRouters;