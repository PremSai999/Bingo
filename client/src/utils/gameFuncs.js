const URL = process.env.REACT_APP_SERVER_URL

export const signup = async (name, email, password)=>{
    const response = await fetch(`${URL}/api/register`, {
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
    const response = await fetch(`${URL}/api/login`, {
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
    const res = await fetch(`${URL}/getPlayers`,{
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
    const res = await fetch(`${URL}/isUnique`,{
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
    const res = await fetch(`${URL}/checkRoom`,{
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
    const res = await fetch(`${URL}/updatePlayer`,{
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
    const res = await fetch(`${URL}/updateReady`,{
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
    const res = await fetch(`${URL}/getGameStats`,{
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

export const sendWinnerMail = async (name)=>{
    console.log("entered")
    const data = await fetch(`${URL}/api/getUser/${name}`,{
                    method:"GET"
                })
    const userDetails = await data.json();
    if(userDetails.ok){
        const res = await fetch(`${URL}/mail/sendMail`,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            name,
            email:userDetails.user.email
            }),
            })
        const win_data = await res.json()
        if(win_data.status==='ok'){
            return true
        }
        else{
            return false
        }
    }
    
}