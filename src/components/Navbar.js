import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
//import NewsTotal from "./NewsTotal";
//import PropTypes from 'prop-types'
const Navbar = (props) => {
  //var datasend;
  let capatalise=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  const history = useNavigate();
  const [txt,setTxt]=useState("know");
    const coursesPage = () => {
      localStorage.setItem("word",txt);
      history("/search");
    }
    const myWork=(event)=>{
      setTxt(event.target.value)
      //console.log(event.action.value);
    }
  return (
    <>
      <nav className={`navbar fixed-top navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/#">
            NewsDehko
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/#">
                  Home
                </Link>
              </li>
              <li className={`nav-item dropdown`}>
                <Link
                  className={`nav-link dropdown-toggle text-${props.mode==="light"?"dark":"white"}`}
                  to="/#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Top Headlines News Category
                </Link>
                <ul className={`dropdown-menu bg-${props.mode==="light"?"white":"dark"}`}>
                  <li>
                    <Link className={`dropdown-item text-${props.mode==="light"?"dark":"white"}`} to="/business">
                      Business
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item text-${props.mode==="light"?"dark":"white"}`} to="/entertainment">
                      Entertainment
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item text-${props.mode==="light"?"dark":"white"}`} to="/general">
                      General
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item text-${props.mode==="light"?"dark":"white"}`} to="/health">
                      Health
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item text-${props.mode==="light"?"dark":"white"}`} to="/science">
                      Science
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item text-${props.mode==="light"?"dark":"white"}`} to="/sports">
                      Sports
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item text-${props.mode==="light"?"dark":"white"}`} to="/technology">
                      Technology
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          
          <form className="form-inline my-2 my-lg-0">
       <input onChange={myWork} className="myform-control mr-sm-2" type="text" placeholder="Search News TopicWise" aria-label="Search"/>
      <button style={{margin:"6px 6px"}} className={`btn btn-outline-${props.mode==="dark"?"light":"dark"} my-2 my-sm-0`} onClick={coursesPage} type="submit">Search</button>
    </form>
    <div className={`form-check form-switch text-${props.textMode}`}>
  <input className="form-check-input" onClick={props.toggleMode} aria-checked type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable {capatalise(props.mode==="dark"?"light":"dark")} Mode</label>
</div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
