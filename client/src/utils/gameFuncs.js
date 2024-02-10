export const checkStart = async (room)=>{
    const res = await fetch("http://localhost:4000/getPlayers",{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    room,
    }),
    })
    const data = await res.json();
    console.log(data)
    if(data.status==='ok'){
        return data
        // setPlayers(data.players)
        // setStarted(data.full)
    }
    else{
        return null
    }
}
