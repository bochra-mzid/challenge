import React, { useContext, useState, useEffect } from 'react'
import photo from "../assets/img/logo.png"
import "../assets/css/general.css"
import { MyContext } from '../MyContext'

import  "../assets/css/profile.css"

function Profile() {
    const { user, setUser } = useContext(MyContext)
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = React.useState(true)
    const id= localStorage.getItem("user")
    React.useEffect(async () => {
        const response = await fetch(`http://localhost:4000/${id}`);
        console.log(response)
        const data = await response.json();
        console.log(data);
        setProfile(data)
        console.log(profile)
        
        setLoading(false)
    }, [])
    return (

        <div className="profileBody">
            <div className="profile">


                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <div>
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            src={photo}
                        />

                    </div>
                    <div style={{marginLeft:"50px"}}>
                        <div style={{ color: "#1f212d" }}>
                            <p className="title">First name: <span className="field">{profile.first_name}</span> </p>
                            <p className="title">Last name: <span className="field">{profile.last_name}</span> </p>
                            
                        </div>
                        

                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop:"20px" }}>
                            <div className="secondry-color">
                            <p className="title">Email: <span className="field">{profile.email}</span> </p>


                            <p className="title">Phone nymber: <span className="field">{profile.phone_number}</span> </p>
                            <p className="title">Date of birth: <span className="field">{profile.date_of_birth}</span> </p>
                            <p className="title">Pole: <span className="field">{profile.pole}</span> </p>
                            <p className="title">Post: <span className="field">{profile.post}</span> </p>
                            </div>
                        </div>

                <div className="file-field input-field " style={{ marginTop: "30px" }}>
                    <div className="btn #64b5f6 blue darken-1 round-button">
                        <input type="file" id="fileinputid" style={{ display: 'none' }} />
                        <label for="fileinputid"  ><h5>update profile</h5></label>


                    </div>

                </div>

            </div>

        </div>

    )
}


export default Profile