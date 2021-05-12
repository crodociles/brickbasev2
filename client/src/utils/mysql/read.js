const domain = "http://192.168.1.4:3001/";

//read all set data
export const readAllSetData = () => {
    return fetch(domain + 'mysql/read/readAllSetData')
    .then((res) => {
        return res.json();
    })
}

//read all sold set data
export const readAllSoldSetData = ()=>{
    return fetch(domain + 'mysql/read/readAllSoldSetData')
    .then((res)=>{
        return res.json();
    })
}

//read set data from set ID
export const readFullSet = (id) =>{
    return fetch(domain + 'mysql/read/readFullSet?' + new URLSearchParams({id}))
    .then(res=>{
        return res.json();
    })
}

//read sold set data from set ID
export const readFullSoldSet = (id) =>{
    return fetch(domain + 'mysql/read/readFullSoldSet?' + new URLSearchParams({id}))
    .then(res=>{
        return res.json();
    })
}

// read part details from set ID
export const readSetParts = (id) => {
    return fetch(domain + 'mysql/read/readSetParts?' + new URLSearchParams({id}))
    .then(res=>{
        return res.json();
    })
}

//read details for set from rebrickable
export function readRbSetSearch(searchStr){
    return fetch(domain + 'mysql/read/readRbSetSearch?' + new URLSearchParams({searchStr}))
    .then((res)=>{
        return res.json();
    })
}

//read theme name from theme ID
export function readThemeName(id){
    return fetch(domain + 'mysql/read/readThemeName?' + new URLSearchParams({id}))
    .then(res=>{
        return res.json();
    })
}

