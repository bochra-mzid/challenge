import React, { useState } from 'react'
import "../assets/css/sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap,faChevronRight,faBriefcase, faMoneyCheckAlt, faShoppingBasket} from '@fortawesome/free-solid-svg-icons'
import { Accordion } from 'react-bootstrap'
export default function Sidebar(props) {
    const [key, setKey] = useState('')

    const open=(e)=>{
        if(e===key)
        {
            setKey('')
        }
        else
        {
            setKey(e)
        }
    }
    return (
        
        <div className="flex-grid">
            <div className={props.visible? "sidebar" : "sidebar-close"}>
                <div className='sidebar-close-X' onClick={props.close}>
                    <i class="far fa-times-circle"></i>
                </div>
                <div className="sidebar-container">
                    <div className="profile-img-container">
                        <img alt="cannot display" className="profile-img" src={require(`../assets/img/logo.png`).default}/>
                        <h4 className='name'>Ensi Junior Entreprise</h4>
                    </div>
                    <hr className="ligne"/>
                    <Accordion >
                        <Accordion.Toggle className="sidebar-link-container" as={"div"} onClick={()=>open(0)} variant="link" eventKey="0">
                            <FontAwesomeIcon className="link-logo" icon={faMap} />
                            <h4 className="accordion-tog">Test</h4>
                            <FontAwesomeIcon className={key===0? "accordion-tog-logo-open":"accordion-tog-logo-close" } icon={faChevronRight} />
                        </Accordion.Toggle>

                          
                            <Accordion.Collapse eventKey="0">
                                <div className="sidebar-link-container collap">
                                    <FontAwesomeIcon className="link-logo" icon={faMoneyCheckAlt} />
                                    <p className="accordion-tog">test</p>
                                </div>
                            </Accordion.Collapse>
                        
                        
                       
                       
                        <Accordion.Toggle className="sidebar-link-container" onClick={()=>open(1)} as={"div"} variant="link" eventKey="1">
                            <FontAwesomeIcon className="link-logo" icon={faBriefcase} />
                            <h4 className="accordion-tog">Test</h4>
                            <FontAwesomeIcon className={key===1? "accordion-tog-logo-open":"accordion-tog-logo-close" } icon={faChevronRight} />
                        </Accordion.Toggle>
                 
                            <Accordion.Collapse eventKey="1" >
                                <div className="sidebar-link-container collap">
                                    <FontAwesomeIcon className="link-logo" icon={faShoppingBasket} />
                                    <p className="accordion-tog">test</p>
                                </div>
                            </Accordion.Collapse>
                      
                         
                    
                    </Accordion>
                </div>
            </div>
            <div className={props.visible? "main" : "main-close"}>
                {props.children}
            </div>
        </div>
    )
}
