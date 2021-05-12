import React,{useEffect, useState} from 'react';
import { BsBook } from "react-icons/bs";
import { GoNote } from "react-icons/go";
import {Link} from 'react-router-dom';
import { readThemeName, readSetParts } from '../utils/mysql/read'

const HomeSetDisplayItem = (props)=>{
    const [showNotes, setShowNotes] = useState(false);
    const [themeName, setThemeName] = useState('');
    const [completePerc, setCompletePerc] = useState('');
    const [quant, setQuant] = useState(0);
    const [quantInSet, setQuantInSet] = useState(0);
    const [parts, setParts] = useState([]);

    useEffect(()=>{
        readThemeName(props.data.theme_id).then(res=>{
            setThemeName(res.response);
        }).then(()=>{
            readSetParts(props.data.id).then(res=>{
                setParts(res.response);
            });
        });

    },[props.data])

    useEffect(()=>{
        let quant = 0;
        let quant_in_set = 0;
        parts.forEach(item=>{
            quant = quant + parseInt(item.quant);
            quant_in_set = quant_in_set + parseInt(item.quant_in_set);
        })
        setQuant(quant);
        setQuantInSet(quant_in_set);
        setCompletePerc(Math.floor((quant_in_set*100)/quant));
    },[parts])
    
    return (
        <div className="hsdi-container">
            <Link className="hsdi-details" to={"/set_details/" + props.data.id} >
                <div className="hsdi-img-container">
                    <img src={props.data.set_img_url} alt={props.data.name} className="hsdi-img" />
                </div>
                <div className="hsdi-details-name-num">
                    <div className="hsdi-theme-num">{props.data.set_num} - {themeName===""?<span className='hsdi-error-msg'>(theme not found)</span>:themeName}</div>
                    <div className="hsdi-name">{props.data.name}</div>
                </div>
            </Link>
            <div className="hsdi-icons-stats">
                <div className={showNotes?"hsdi-notes-text":"hsdi-notes-text hsdi-hide-notes"}>{props.data.notes}</div>
                <div className="hsdi-stats">
                    <div className="hsdi-complete">
                        <span>{completePerc}%</span>
                    </div>
                    <div className="hsdi-complete-parts">
                        <span>{quantInSet}/{quant}</span>
                    </div>
                    <div className="hsdi-inst-icon"><BsBook style={{"color":props.data.instructions?"#ddd":"#000"}}/></div>
                    <div className="hsdi-notes-icon"><GoNote onClick={()=>{if(props.data.notes!=="")setShowNotes(!showNotes)}} style={props.data.notes!==""?{"color":"#ddd",cursor:'pointer'}:{"color":"#000"}}/></div>
                </div>
            </div>
        </div> 
        )
}

export default HomeSetDisplayItem;