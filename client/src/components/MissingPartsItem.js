import React, { useState } from 'react';

import qm from '../img/qm.png';

import { IoTriangleSharp } from 'react-icons/io5';

const MissingPartsItem = (props) =>{

    const [partsOpen, setPartsOpen] = useState(false);

    const handleOpenParts = () => {
        setPartsOpen(!partsOpen);
    }


    const parts = props.data.parts.map(part=>{
        console.log(part.part_img_url==="null",qm);
        return(
            <div className="mpi-part-container" key={part.id}>
                <div className="mpi-part-name">{part.name}</div>
                <div className="mpi-part-color">{part.color}</div>
                <div className="mpi-part-img-container">
                    <img src={part.part_img_url!=="null"?part.part_img_url:qm} alt={part.name} className="mpi-part-img" />
                </div>
                <div className="mpi-part-num">{part.part_num}</div>
                <div className="mpi-part-quant">X{(part.quant)-(part.quant_in_set)}</div>
            </div>
        )
    })

    return(
        <div className="mpi-container mpi-open">
            <div className="mpi-set-title" onClick={handleOpenParts}>
                <div className="mpi-set-title-text">
                    <h2>{props.data.set_num} - {props.data.name}</h2>
                </div>
                <div className="mpi-set-arrow"><IoTriangleSharp  className={partsOpen?"mpi-icon-open":"mpi-icon-closed"} size="1.5rem" /></div>
            </div>
            <div className={partsOpen?"mpi-all-part-container":"mpi-all-part-container mpi-closed"}>
                {parts}
            </div>
        </div>
    )
}

export default MissingPartsItem;