import React, { useState } from 'react';
import MainHeader from '../../../../components/admin/MainHeader';
import ModalPackage from './ModalPackage';
import TablePackage from './TablePackage';

const inner = {
    planId: "",
    discount: "",
    time: "",
};
function Package(props) {
    const [packageData, setPackageData] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [find, setFind] = useState("");
    const [page, setPage] = useState(0);


    const handleOpen = () => {
        setOpen(true);
        setPackageData(inner);
        setError(inner);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSearch = (e) => {
        setFind(e.target.value);
        setPage(0);
    };

    const handleEdit = (row) => {
        setPackageData(row);
        setOpen(true);
        setError(inner);
    }

    return (
        <div>
            <MainHeader handleOpen={handleOpen} handleSearch={handleSearch} title="Packages" />
            <ModalPackage error={error} setError={setError} handleClose={handleClose} open={open} packageData={packageData} setPackageData={setPackageData} />
            <TablePackage handleEdit={handleEdit} />
        </div>
    );
}

export default Package;