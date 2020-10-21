import React from 'react'

import '../styles/components/loginbackground.css'
import logoSvg from '../images/login-logo.svg'

export default function LoginPage(){
    return (
        <div id="content-wrapper">
            <div className="landing">
                <img className="logo" src={logoSvg}></img>
            </div>    
        </div>
    );
}