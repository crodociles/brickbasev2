import React from 'react';
import { FaCheckCircle, FaPlus, FaMinus } from 'react-icons/fa';
import qm from '../img/qm.png';

const SetDetailsPart = (props) =>{
    const item = props.part;
    const partComplete = parseInt(item.quant) === parseInt(item.quant_in_set);
    return (
        <div 
            key={item.id} 
            onClick={()=>{props.highlightedPartSet(item.id)}}
            className={props.highlightedPart===item.id?"sdp-row sdp-highlight-row":"sdp-row"}
        >
            <div className="sdp-col1">
                <div className="sdp-complete-col" id="sdp-complete-column">{partComplete?<FaCheckCircle />:""}</div>
            </div>
            <div className="sdp-col2">
                <div className={"sdp-img-col " + (partComplete?"row-complete":"row-normal")}>
                    <img 
                        src={item.part_img_url!=="null"?item.part_img_url:qm} 
                        alt={item.name} 
                        height={props.highlightedPart===item.id?"100px":"50px"}
                    />
                </div>
                <div className="sdp-name-num-container">
                    <div className={"sdp-num-col " + (partComplete?"row-complete":"row-normal")}>{item.part_num}</div>
                    <div className={"sdp-color-name-col " + (partComplete?"row-complete":"row-normal")}>{item.color} {item.name}</div>
                </div>
            </div>
            <div className="sdp-col3">
                <div className={"sdp-quant-col " + (partComplete?"row-complete":"row-normal")}>{item.quant}</div>
                <div className="sdp-quant-got-col">
                    {props.sold?"":props.highlightedPart===item.id?<FaMinus size="25px"  className="sdp-plus-minus" onClick={()=>props.handleOnChangeQuantity(item.id,parseInt(item.quant_in_set)-1,parseInt(item.quant))}/>:""}
                    <input className="sdp-quant-in-set" onFocus={()=>{props.highlightedPartSet(item.id)}} type="text" value={item.quant_in_set} onChange={(e)=>props.handleOnChangeQuantity(item.id,e.target.value,parseInt(item.quant))}/>
                    {props.sold?"":props.highlightedPart===item.id?<FaPlus size="25px" className="sdp-plus-minus"  onClick={()=>props.handleOnChangeQuantity(item.id,parseInt(item.quant_in_set)+1,parseInt(item.quant))}/>:""}
                </div>
            </div>
        </div> 
    )
}

export default SetDetailsPart;