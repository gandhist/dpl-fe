/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setisLoading } from "../../redux/action";

import { Nav } from "react-bootstrap";

function Sidebar({ color, image, routes }) {

  const localAuth = JSON.parse(localStorage.getItem('p3sAuth'));
  const location = useLocation();
  const dispatch = useDispatch();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img mr-2">
              <img
                src={require("assets/img/ra.png").default}
                alt="RA Organizer" className="rounded"
              />
            </div>
          </a>
          <a className="simple-text" href="#">
            {localAuth?.user.name}
          </a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              if (prop.icon != 'invisible') {
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      onClick={() => {
                        if(location.pathname != prop.layout + prop.path){
                          dispatch(setisLoading(true))
                        }
                      }}
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              }
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
