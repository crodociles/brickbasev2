import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import TopBar from './TopBar';

import { readAllSoldSetData} from '../utils/mysql/read';
import SoldSetsItem from './SoldSetsItem';

const SoldSets = ()=>{

    const [fullDetails, setFullDetails] = useState([]);
    
    useEffect(()=>{
        readAllSoldSetData()
        .then(res=>{
            const list = res.response;
            list.sort((a,b)=>a.sold_date>b.sold_date?-1:1)
            setFullDetails(list);
        })
    },[])

    const items = fullDetails.map(item=>{
        return <SoldSetsItem data={item} key={item.id} />
    })

    return(
        <div>
            <TopBar />
            <SideBar />
            <div id="ss-container">
                <h1>Sold Sets</h1>
                {items}
            </div>
        </div>
    )
}

export default SoldSets;