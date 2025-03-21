
import React from 'react';
import Categories from '../pages/admin/categories/Categories';
import Dashboard from '../pages/admin/dashboard/Dashboard';
import Actors from '../pages/admin/cast&crew/actors/Actors';
import Authors from '../pages/admin/cast&crew/authors/Authors';
import Characters from '../pages/admin/cast&crew/characters/Characters';
import Episodes from '../pages/admin/media_management/episodes/Episodes';
import UserPages from '../pages/admin/userpage/UserPages';
import Movie from '../pages/admin/media_management/movie/Movie';
import Profile from '../pages/admin/profile/Profile';
import Feature from '../pages/admin/vip/feature/Feature';

import { Route, Routes } from 'react-router-dom';
import Trailer from '../pages/admin/media_management/trailer/Trailer.Jsx';
import Package from '../pages/admin/vip/package/Package';
import Plans from '../pages/admin/vip/plans/Plans';


function AdminRouters(props) {
    const router = [
        { path: "/", element: <Dashboard /> },
        { path: "/categories", element: <Categories /> },
        { path: "/cast&crew/actors", element: <Actors /> },
        { path: "/cast&crew/authors", element: <Authors /> },
        { path: "/cast&crew/characters", element: <Characters /> },
        { path: "/userspage", element: <UserPages /> },
        { path: "/profile", element: <Profile /> },
        { path: "/media_management/episodes", element: <Episodes /> },
        { path: "/media_management/movie", element: <Movie /> },
        { path: "/media_management/trailer", element: <Trailer /> },
        { path: "/vip/feature", element: <Feature /> },
        { path: "/vip/package", element: <Package /> },
        { path: "/vip/plans", element: <Plans /> }

    ]
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

export default AdminRouters;