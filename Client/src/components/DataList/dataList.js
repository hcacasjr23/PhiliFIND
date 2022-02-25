import React, { useEffect, useState } from 'react';

import { List, Datagrid, TextField } from 'react-admin';



function DataList(props) {

    return (

        

        < List {...props }>
            <Datagrid>
                <TextField source='id' />
                <TextField source='fd_item' />
                <TextField source='fd_brand' />
                <TextField source='fd_place' />
                <TextField source='fd_zip' />
                <TextField source='fd_email' />
                <TextField source='fd_pcontact' />
            </Datagrid>
            
        </List >

    )
}

export default DataList;