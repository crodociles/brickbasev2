import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import HomeSetDisplayItem from './HomeSetDisplayItem';
import { readAllSetData} from '../utils/mysql/read';

import plus from '../img/plus.png';

const HomeSetDisplay = ()=>{
    const [fullDetails, setFullDetails] = useState([]); 
    const [filteredDetails, setFilteredDetails] = useState([]); 
    const [sortType, setSortType] = useState('name');
    const [filterStr, setFilterStr] = useState('');

    useEffect(()=>{
        readAllSetData()
        .then(res=>{
            setFullDetails(res.response);
            setFilteredDetails(res.response);
        })
    },[])

    useEffect(() => {
        if(filterStr.length>0){
            const filteredDetails = fullDetails.filter(item=>{
                return item.name.toLowerCase().includes(filterStr.toLowerCase()) || item.set_num.includes(filterStr)
            })
            setFilteredDetails(filteredDetails);
        }
        else{
            const notSold = fullDetails.filter(item=>{
                return !item.sold;
            })
            setFilteredDetails(notSold);
        }
    }, [filterStr,fullDetails])
    
    const handleChangeFilter = (e)=>{
        setFilterStr(e.target.value);
    }

    const items = filteredDetails.sort((a,b)=>a[sortType]>b[sortType]?1:-1).map(item=>{
        return <HomeSetDisplayItem data={item} key={item.id}/>
    });

    return (
        <div id="hsd-container">
            <h1>Sets Overview</h1>
            <div id="hsd-filter-wrapper">
                <input id="hsd-filter-input" placeholder="Search..." type="text" value={filterStr} onChange={handleChangeFilter} />
            </div>
            <div id="hsd-sort-container">
                <select id="hsd-sort-select" onChange={e=>{setSortType(e.target.value)}}>
                    <option value="name">Set Name</option>
                    <option value="set_num">Set Number</option>
                    <option value="theme_name">Theme</option>
                    <option value="revPerc">% complete(desc)</option>
                    <option value="perc">% complete(asc)</option>
                </select>
            </div>
            {items}
            <div id="hsd-add-new">
                <Link to="/add_new_set">
                    <div id="hsd-add-new-img-container">
                        <img src={plus} alt="" id="hsd-add-new-img"/>
                    </div>
                    <div id="hsd-add-new-text">
                        Add Set
                    </div>
                </Link>
            </div>
        </div> 

    )
}

export default HomeSetDisplay;