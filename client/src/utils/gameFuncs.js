export const signup = async (name, email, password)=>{
    const response = await fetch('http://localhost:4000/api/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name,
                            email,
                            password,
                        }),
                    })
	const data = await response.json();
    return data;
}

export const login = async (email, password)=>{
    const response = await fetch('http://localhost:4000/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email,
                            password,
                        }),
                    })
	const data = await response.json();
    return data;
}

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
    if(data.status==='ok'){
        return data;
    }
    else{
        return null;
    }
}

export const isUnique = async (room, size, name)=>{
    const res = await fetch("http://localhost:4000/isUnique",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    room,
                    name,
                    totalPlayers:size
                }),
                })
    const data = await res.json();
    if(data.status==='ok'){
        return data;
    }
    else{
        return null;
    }
}

export const checkRoom = async (roomId)=>{
    const res = await fetch("http://localhost:4000/checkRoom",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roomId,
                }),
                })
    const data = await res.json();
    return data;
}

export const updatePlayer = async (roomId, name)=>{
    const res = await fetch("http://localhost:4000/updatePlayer",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                roomId,
                name,
                }),
                })
    const data = await res.json();
    return data;
}

export const updateReady = async (roomId)=>{
    const res = await fetch("http://localhost:4000/updateReady",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                roomId,
                }),
                })
    const data = await res.json();
    return data 
}

export const getGameStats =  async (name)=>{
    const res = await fetch("http://localhost:4000/getGameStats",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                name,
                }),
                })
    const data = await res.json();
    return data 
}