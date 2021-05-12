const domain = "http://192.168.1.4:3001/";

export const updateAddNewSet = (setData)=>{
    return fetch(domain + 'mysql/update/addNewSet?' + new URLSearchParams({setData:JSON.stringify(setData)}))
    .then((res) => {
        return res.json();
    })
}

export const updateInstructions = (id,instructions) => {
    return fetch(domain + 'mysql/update/updateInstructions?' + new URLSearchParams({id,instructions}))
    .then((res)=>{
        return res.json();
    })
}

export const updateNotes = (id,notes) => {
    return fetch(domain + 'mysql/update/updateNotes?' + new URLSearchParams({id,notes}))
    .then((res)=>{
        return res.json();
    })
}

export const updatePartQuantity = (setId,partId,newQuant) => {
    return fetch(domain + 'mysql/update/updatePartQuantity?' + new URLSearchParams({setId,partId,newQuant}))
    .then(res=>{
        return res.json();
    })
}

export const updateAllParts = (setId) => {
    return fetch(domain + 'mysql/update/updateAllParts?' + new URLSearchParams({setId}))
    .then(res=>{
        return res.json();
    })
}

export const updateSold = (setId, date, price) => {
    return fetch(domain + 'mysql/update/updateSold?' + new URLSearchParams({setId,date,price}))
    .then(res=>{
        return res.json();
    })
}

export const updateRelist = (setId) => {
    return fetch(domain + 'mysql/update/updateRelist?' + new URLSearchParams({setId}))
    .then(res=>{
        return res.json();
    })
}

export const updateArchiveSet = (setId) => {
    return fetch(domain + 'mysql/update/updateArchiveSet?' + new URLSearchParams({setId}))
    .then(res=>{
        return res.json();
    })
}

export const updateSaveParts = (setId, parts) => {
    return fetch(domain + 'mysql/update/updateSaveParts?' + new URLSearchParams({setId, parts}))
    .then(res=>{
        return res.json();
    })
}