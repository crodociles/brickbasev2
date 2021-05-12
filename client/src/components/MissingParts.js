import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';
import { readAllSetData, readSetParts } from '../utils/mysql/read';
import MissingPartsItem from './MissingPartsItem';

const MissingParts = ()=>{
    const [partsData, setPartsData] = useState([])

    useEffect(()=>{
        readAllSetData().then((res)=>{
            res.response.forEach(item=>{
                let flag = false;
                const setParts = [];
                readSetParts(item.id).then((parts)=>{
                    parts.response.forEach(part=>{
                        if(parseInt(part.quant_in_set)!==parseInt(part.quant)){
                            flag = true;
                            setParts.push(part);
                        }
                    })
                    if(flag){
                        setPartsData(prev=>{
                            return(
                                [...prev,{
                                    id:item.id,
                                    name:item.name,
                                    set_num:item.set_num,
                                    parts:setParts
                                }]
                            )
                        })
                    }
                })
            })
        })
    },[])

    const items = partsData.map(item=>{
        return <MissingPartsItem data={item} key={item.id}/>
    })

    return(
        <div>
            <TopBar/>
            <SideBar />
            <div id="mp-container">
                <h1>Missing Parts</h1>
                <div id="mp-items-container">
                    {items}
                </div>
            </div>
        </div>
    )
}

export default MissingParts;