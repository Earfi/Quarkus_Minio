import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Swal from 'sweetalert2'
import { useParams } from "react-router-dom";


function EditUser({id}) {
    const { ids } = useParams();
    const [user,setUser] = useState(null)

    useEffect(() => {  
        console.log(id);
 
        const getUserById = async () => { 
            const res = await fetch(`http://localhost:8080/user/${ids}`,{
                method: "GET",
                headers: { 
                    'Authorization': `Bearer ` + localStorage.getItem("token")
                },
            }) 
            console.log(res);
            const data = await res.json()
            setUser(data) 
            console.log(data);
        }
 
        getUserById()
    },[id])

    return(
        <div className="w-full h-[100vh] flex min-w-[1300px] overflow-hidden">
            <div className="w-[15%] h-full shadow-2xl">
                <Sidebar/>
            </div>

            <div className="w-[85%] h-full overflow-hidden">
                id : {ids}
            </div>
 
        </div>
    )
}

export default EditUser;