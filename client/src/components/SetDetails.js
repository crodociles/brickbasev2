import React, { useState,useEffect } from 'react';
import { IoOptions } from 'react-icons/io5';
import dateformat from 'dateformat';
import {Button, InputGroup, FormControl} from 'react-bootstrap';
import Modal from 'react-modal';

import TopBar from './TopBar';
import SideBar from './SideBar';
import SetDetailsPart from './SetDetailsPart';

import { 
    updateInstructions, 
    updateNotes, 
    updatePartQuantity,
    updateSold,
    updateRelist,
    updateArchiveSet,
    } from '../utils/mysql/update';

import { 
    readFullSet, 
    readSetParts, 
    readThemeName,
    readFullSoldSet 
    } from '../utils/mysql/read';

import {
    deleteSet
} from '../utils/mysql/delete';


const SetDetails = (props) =>{
    const [details, setDetails] = useState({});
    const [notes, setNotes] = useState("");
    const [parts, setParts] = useState();
    const [highlightedPart, setHighlightedPart] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [allSetText, setText] = useState("All Set Parts");
    const [sold, setSold] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [soldPrice, setSoldPrice] = useState(0);
    const [soldDate, setSoldDate] = useState(0);

    //MODAL
    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };

    useEffect(()=>{
        //get set details from passed ID
        readFullSet(props.match.params.id).then((res)=>{
            if(res.response.length===0){
                readFullSoldSet(props.match.params.id).then(res=>{
                    setSold(true);
                    setDetails(res.response[0]);
                })
            }else{
                const details = res.response[0];
                // use theme ID to get theme name
                readThemeName(details.theme_id).then(res=>{
                    //add theme name to object and set object to state
                    details.theme_name = res.response;
                    setDetails(details);
                    setNotes(details.notes);
                }).then(()=>{
                    readSetParts(props.match.params.id).then(res=>{
                        setParts(res.response);
                    })
                })
            }
        })
    },[props.match.params.id])
        
    const handleOnChangeQuantity = (partId,newQuant,fullQuant)=>{
        if(newQuant>=0 && newQuant <= fullQuant){
            const part = parts.map(item=>{
                if(item.id === partId){
                    updatePartQuantity(details.id, partId, newQuant);
                    return  {
                        ...item, quant_in_set: newQuant
                    }
                }else{
                    return item;
                }
            })
            setParts(part);
        }
    }

    const handleCompleteParts = () =>{
        let num = 0;
        parts.forEach(item=>{
            setTimeout(()=>{
                num++;
                updatePartQuantity(details.id, item.id, item.quant);
                setText(" Updating " + num + "/" + parts.length);
                if(num === parts.length){
                    setText("Done!");
                    setTimeout(()=>{
                        readSetParts(props.match.params.id).then(res=>{
                            setParts(res.response);
                        });
                        setText("All Set Parts");
                        setShowMenu(false);
                    }, 600)
                }
            },50)
            
        });
    }

    const handleSoldModal = () =>{
        setModalIsOpen(true);
        setShowMenu(false);
    }

    const handleUpdateSold = (e) =>{
        e.preventDefault();
        updateSold(details.id,soldDate,soldPrice)
        .then((res)=>{
            props.history.push('/sold');
        })
    }
    
    const handleRelist = () =>{
        const conf = window.confirm("Are you sure you want to relist this set?")
        if(conf){
            updateRelist(details.id).then(res=>{
                props.history.push('/');
            })
        }
    }

    const handleArchive = () =>{
        const conf = window.confirm("Are you sure you want to archive this set? THIS ACTION CANNOT BE UNDONE!!")
        if(conf){
            updateArchiveSet(details.id).then(res=>{
                props.history.push('/sold');
            })
        }
    }
    const handleDeleteSet = ()=>{
        const conf = window.confirm('Are you sure you want to delete this set? THIS CANNOT BE UNDONE!');
        if(conf === true){
            deleteSet(details.id).then((res)=>{
                props.history.push('/');
            })
        }
    }

    const setDetailsPartsList = parts?
        parts.sort((a, b) => a.color.localeCompare(b.color) || a.name.localeCompare(b.name)).map(item=>{
            return <SetDetailsPart
                        part={item}
                        key={item.id}
                        highlightedPartSet={(id)=>{setHighlightedPart(id)}}
                        highlightedPart={highlightedPart}
                        handleOnChangeQuantity={handleOnChangeQuantity}
                    />
            })
        :"";
    

    return (
        <div>
            <TopBar/>
            <SideBar />
            <div id="sd-container">
                <div id="sd-details-container">
                    <div id="sd-headers-notes-container">
                        <div id="sd-headers">
                            <div id="sd-set-name">{details.name}</div>
                            <div id="sd-set-num">{details.set_num} - {details.theme_name}</div>
                        </div>
                        <div id="sd-instructions-container">
                            <div id="sd-instructions-text">
                                This set includes instructions:
                            </div>
                            <div id="sd-instructions-input">
                                <input type="checkbox" defaultChecked={details.instructions} onChange={(e)=>{updateInstructions(details.id,e.target.checked)}}/>
                            </div>
                        </div>
                        <div className="sd-notes-container">
                            <div className="sd-notes-title">Notes</div>
                            <textarea value={notes} className="sd-notes-text" onChange={e=>{setNotes(e.target.value)}}></textarea>
                            <button className="sd-notes-btn" onClick={()=>{updateNotes(details.id,notes)}}>Save</button>
                        </div>
                    </div>
                    <div id="sd-img-container">
                        <img id="sd-img" src={details.set_img_url} alt={details.name} />
                    </div>
                </div>
                <div id={sold?"sdp-dd-hide":"sdp-dd"}>
                    <div id="sdp-dd-btn"><IoOptions size="28px" onClick={()=>{setShowMenu(!showMenu)}}/></div>
                    <div id="sdp-dd-menu" className={showMenu?"":"sdp-hide-menu"} >
                        <div className="sdp-dd-item" onClick={handleCompleteParts}>{allSetText}</div>
                        <div className="sdp-dd-item" onClick={handleSoldModal}>Mark as Sold</div>
                        <div className="sdp-dd-item">Delete Set</div>
                    </div>
                </div>
            </div>
            
            <div className={sold?"":"hide"} id="sd-sold">
                <div id="sd-sold-details-container">
                    <div id="sd-sold-title">SOLD</div>
                    <div className="sd-sold-detail sd-sold-price">£{details.sold_price}</div>
                    <div className="sd-sold-detail sd-sold-date">{details.sold_date?dateformat(details.sold_date,'dd/mm/yyyy'):""}</div>
                </div>
                {details.archived?<div id="sd-archived">ARCHIVED</div>:<div id="sd-relist">
                    <Button variant="outline-danger" id="sd-relist-btn" onClick={handleRelist}>Relist</Button>
                    <Button variant="secondary" id="sd-archive-btn" onClick={handleArchive}>Archive</Button>
                </div>
                }
            </div>
            <div id="sd-parts-container">
                {setDetailsPartsList}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={()=>setModalIsOpen(false)}
                style={customStyles}>
                    <form onSubmit={e=>{handleUpdateSold(e)}}>
                        <h2>Sold</h2>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">£</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl 
                                placeholder="Price"
                                aria-label="Price"
                                onChange={e=>{setSoldPrice(e.target.value)}}
                            />
                        </InputGroup><br/>
                        <div>
                            <input type="date" id="sd-sold-modal-input"
                                onChange={e=>{setSoldDate(e.target.value)}} />
                        </div>
                        <input type="submit" value="Save"/>
                    </form>
                </Modal>
        </div>
    )

}

export default SetDetails;