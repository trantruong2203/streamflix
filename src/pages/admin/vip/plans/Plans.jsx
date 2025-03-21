import React, { useState } from 'react';
import MainHeader from '../../../../components/admin/MainHeader';
import ModalPlan from './ModalPlan';
import TablePlan from './TablePlan';

const inner = {
    level: "",
    PricePerMonth: "",
    title: "",
};
function Plans(props) {
    const [plan, setPlan] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [find, setFind] = useState("");
    const [page, setPage] = useState(0);


    const handleOpen = () => {
        setOpen(true);
        setPlan(inner);
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
        setPlan(row);
        setOpen(true);
        setError(inner);
    }

    return (
        <div>
            <MainHeader handleOpen={handleOpen} handleSearch={handleSearch} title="Plans" />
            <ModalPlan  error={error} setError={setError} handleClose={handleClose} open={open} plan={plan} setPlan={setPlan} />
            <TablePlan find={find} page={page} setPage={setPage} handleEdit={handleEdit}/>
        </div>
    );
}

export default Plans;