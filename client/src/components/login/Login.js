import React from 'react'

function Login() {
    const [password, setPassword] = useState()
    const [email, setEmail]= useState()
    const [isLoaded, setIsLoaded] = useState(false)
    if (!isLoaded) {
        console.log("loaded")
        fetch("http://localhost:4000/users").then(response =>
            response.json()
        ).then(data => {
            setIsLoaded(true)
            setUsers(data)
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }
    function handlePassChange(e){
        setPassword(e.target.value)
        console.log(password)
      }

      function handleEmailChange(e){
        setEmail(e.target.value)
        console.log(email)
      }
    function test(){
        
        for (i=0; i=legth(users); i++){
            if (users[i].email==email){
                if (users[i].password==password){
                    loggedIn=true;
                    user.email=email;
                    user.password=password;
                }
            }
        }
    }
            return (
                <form>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name" />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email"  value={email} oncChange={handleEmailChange}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={handlePassChange}/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" onClick={()=>{test()}}>Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <a href="#">sign in?</a>
                    </p>
                </form>
            );
        }
    

