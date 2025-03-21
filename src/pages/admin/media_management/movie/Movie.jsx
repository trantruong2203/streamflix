import React, { useContext, useState } from 'react';
import MainHeader from '../../../../components/admin/MainHeader';
import ModalAddMovie from './ModalAddMovie';
import ModalChooseCategories from './ModalChooseCategories';
import { ContextCategories } from '../../../../context/CategoriesProvider';
import { ActorContext } from '../../../../context/ActorProvide';
import { CharacterContext } from '../../../../context/CharactersProvider';
import logo from '../../../../assets/DeWatermark.ai_1742354548201-removebg-preview.png'

const inner = {
    name: "",
    description: "",
    duration: "",
    authorID: "",
    planID: "",
    listCate: [],
    listActor: [],
    listCharacter: [],
    rentalPrice: 0,
    likesCount: 0,
    viewsCount: 0,
    date: new Date(),
    imgUrl: logo
};
function Movie(props) {
    const [openAddMovie, setOpenAddMovie] = useState(false);
    const [openModalChoose, setOpenModalChoose] = useState(false);
    const [movie, setMovie] = useState(inner);
    const [dataChoose, setDataChoose] = useState([]);
    const [typeChoose, setTypeChoose] = useState("");

    const categories = useContext(ContextCategories);
    const actors = useContext(ActorContext);
    const characters = useContext(CharacterContext);

    const handleChoose = (type) => {
        setTypeChoose(type);
        switch (type) {
            case "categories":
                setDataChoose(categories);
                break;
            case "actors":
                setDataChoose(actors);
                break;
            case "characters":
                setDataChoose(characters);
                break;
        }
        setOpenModalChoose(true);
    }

    const handleSelect = (id) => {
        switch (typeChoose) {
            case "categories":
                setMovie(pre => {
                    return { ...movie, listCate: toggleSelection(pre.listCate, id) }
                });
                break;
            case "actors":
                setMovie(pre => {
                    return { ...movie, listActor: toggleSelection(pre.listActor, id) };
                });
                break;
            case "characters":
                setMovie(pre => {
                    return { ...movie, listCharacter: toggleSelection(pre.listCharacter, id) }
                });
                break;
        }
    }

    const toggleSelection = (list, id) => {
        return list.includes(id) ? list.filter(e => e !== id) : [...list, id];
    }

    const dataSelect = () => {
        switch (typeChoose) {
            case "categories":
                  return movie.listCate ;
            case "actors":
                return movie.listActor ;
              
            case "characters":
                return movie.listCharacter ;
        }
    }

    const handleOpenAddMovie = () => {
        setOpenAddMovie(true);
    };

    const handleCloseAddMovie = () => setOpenAddMovie(false);

    const handopenModalChoose = () => {
        setOpenModalChoose(true);
    };

    const handleCloseModalChoose = () => setOpenModalChoose(false);

    return (
        <div>
            <MainHeader handleOpen={handleOpenAddMovie} handleClose={handleCloseAddMovie} title="Movie" />
            <ModalAddMovie
                open={openAddMovie}
                handleClose={handleCloseAddMovie}
                handleChoose={handleChoose}
                movie={movie}
                typeChoose={typeChoose}
            />
            <ModalChooseCategories
                open={openModalChoose}
                handleClose={handleCloseModalChoose}
                dataChoose={dataChoose}
                typeChoose={typeChoose}
                handleSelect={handleSelect}
                dataSelect={dataSelect()}
            />
        </div>
    );
}

export default Movie;