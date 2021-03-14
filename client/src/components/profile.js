import React from 'react'
import photo from "../assets/img/logo.png"
import "../assets/css/general.css"
function Profile  (){
    
   return (
       <div style={{maxWidth:"550px",margin:"111px auto"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={photo}
                   />
                 
               </div>
               <div>
                   <div style={{color:"#1f212d"}}>
                   <h1>mohamed <br/> Ben zaied<br/> </h1>
                   <h1>  </h1>
                   </div>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <div className="secondry-color">
                       
                       <h6>adreese@adresse.com</h6>
                       <h6>12 345 678</h6>
                       <h6>0 posts</h6>
                       </div>
                   </div>

               </div>
           </div>
        
            <div className="file-field input-field " style={{margin:"10px"}}>
            <div className="btn #64b5f6 blue darken-1 round-button">
                 <input type="file" id="fileinputid"  style={{display:'none'}} />
                <label for="fileinputid"  ><h5>update picTURE</h5></label>
                
                
            </div>
            
            </div>
            
            </div>      
          
       </div>
       
   )
}


export default Profile