import React, { useContext } from 'react';
import { ContextCategories } from '../../../context/CategoriesProvider';
import { Link } from 'react-router-dom';

function Categories(props) {
    const categories = useContext(ContextCategories);
    
    const gradients = [
        'bg-gradient-to-r from-blue-500 to-cyan-500',
        'bg-gradient-to-r from-purple-500 to-pink-500',
        'bg-gradient-to-r from-orange-500 to-red-500',
        'bg-gradient-to-r from-green-500 to-emerald-500',
        'bg-gradient-to-r from-yellow-500 to-amber-500',
        'bg-gradient-to-r from-indigo-500 to-purple-500',
        'bg-gradient-to-r from-pink-500 to-rose-500',
        'bg-gradient-to-r from-teal-500 to-cyan-500',
        'bg-gradient-to-r from-violet-500 to-purple-500',
        'bg-gradient-to-r from-rose-500 to-pink-500'
    ];

    const getRandomGradient = () => {
        return gradients[Math.floor(Math.random() * gradients.length)];
    };

    return (
        <div className="p-6">
            <div>
                <h2 className="text-2xl font-bold mb-6">Các Thể Loại</h2>
                <div>
                    <div className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-6 gap-4'>
                        {categories.map((category) => (
                            <Link
                                to={`/main/movies/${category.id}`}
                                key={category.id} 
                                className={`w-[150px] md:w-[220px] h-[150px] p-4 ${getRandomGradient()} rounded-lg flex flex-col justify-between text-white hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg`}
                            >
                                <div className="font-semibold text-lg">{category.name}</div>
                                <div className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                                    Xem tất cả →
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categories;