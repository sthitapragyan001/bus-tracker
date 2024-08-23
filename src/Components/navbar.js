import React from 'react'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a href='https://roboticsclub.iitd.ac.in/'><img src='./Logo.png' height={40} width={90} /></a>       
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">About Us</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">Share</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

