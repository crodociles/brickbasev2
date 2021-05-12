const domain = "http://192.168.1.4:3001/";

export const deleteSet = (setId)=>{
    return fetch(domain + 'mysql/delete/deleteSet?' + new URLSearchParams({setId}))
    .then((res) => {
        return res.json();
    })
}