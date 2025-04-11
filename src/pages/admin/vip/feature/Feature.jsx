import React, { useState } from 'react';
import MainHeader from '../../../../components/admin/MainHeader';
import ModalFeature from './ModalFeature';
import TableFeature from './TableFeature';
const inner = {
    plan: "",
    description: "",
    available: "Yes",
}
function Feature(props) {
    const [featureData, setFeatureData] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [find, setFind] = useState("");
    const [page, setPage] = useState(0);

    const handleOpen = () => {
        setOpen(true);
        setFeatureData(inner);
        setError(inner);
    }

    const handleClose = () => {
        setOpen(false);
        setFeatureData(inner);
        setError(inner);
    }

    const handleSearch = (e) => {
        setFind(e.target.value);
        setPage(0);
    };

    const handleEdit = (row) => {
        setFeatureData(row);
        setOpen(true);
        setError(inner);
    }

    return (
        <div>
            <MainHeader title="Feature" handleOpen={handleOpen}  />
            <ModalFeature open={open} featureData={featureData} setFeatureData={setFeatureData} handleClose={handleClose} error={error} setError={setError} />
            <TableFeature find={find}  page={page} setPage={setPage} handleEdit={handleEdit} />
        </div>
    );
}

export default Feature;