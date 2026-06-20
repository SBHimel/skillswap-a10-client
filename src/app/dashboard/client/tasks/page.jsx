
import AddTaskModal from '@/components/dashboard/client/AddTaskModal';
import React from 'react';

const SellerProductPage = () => {
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl font-bold'>Products</h1>
                <AddTaskModal></AddTaskModal>
            </div>
        </div>
    );
};

export default SellerProductPage;