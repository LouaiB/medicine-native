import React, { useEffect } from 'react';
import { DbService } from './services/db.service';

export default function Init() {

    useEffect(() => {
        DbService.init();
    }, []);

    return (
        <></>
    )
}
