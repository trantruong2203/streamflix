import React from 'react';
import Welcome from '../pages/client/main/Welcome';
import Main from '../pages/client/main/Main';
import { Route, Routes } from 'react-router-dom';
import RentMovie from '../pages/client/vip/RentMovie';
import Categories from '../pages/client/categories/Categories';
import NewMovie from '../pages/client/newmovie/NewMovie';
import MovieDetail from '../pages/client/detail/MovieDetail';
import PlayMovie from '../pages/client/detail/PlayMovie';
const router = [
    { path: '/', element: <Welcome /> },
    {path: '/main', element: <Main />},
    {path: '/vip', element: <RentMovie />},
    {path: '/main/categories', element: <Categories />},
    {path: '/main/newmovie', element: <NewMovie />},
    {path: '/main/rentmovie', element: <RentMovie />},
    {path: '/detail/moviedetail', element: <MovieDetail />},
    {path: '/play-movie', element: <PlayMovie />},


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