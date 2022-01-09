import React from "react";
import "./contact.css";

const ContactPage = ({ product }) => {
  return (
    <>
      <div className="red-bg">
      <div className="background">
        <div className="container">
          <div className="screen">
            <div className="screen-header">
              <div className="screen-header-left">
                <div className="screen-header-button close"></div>
                <div className="screen-header-button maximize"></div>
                <div className="screen-header-button minimize"></div>
              </div>
              <div className="screen-header-right">
                <div className="screen-header-ellipsis"></div>
                <div className="screen-header-ellipsis"></div>
                <div className="screen-header-ellipsis"></div>
              </div>
            </div>
            <div className="screen-body">
              <div className="screen-body-item left">
                <div className="app-title">
                  <span>CONTACT</span>
                  <span>US</span>
                </div>
                <div className="app-contact">
                  CONTACT INFO : +12 34 456 789 123
                </div>
              </div>
              <div className="screen-body-item">
                <form action="" method="post">
                <div className="app-form">
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      placeholder="NAME"
                      type="text"
                      name="name"
                    />
                  </div>
                  <div className="app-form-group">
                    <input className="app-form-control" name="email" placeholder="EMAIL" type="email" />
                  </div>
                  <div className="app-form-group">
                    <input
                      className="app-form-control" name="number"
                      placeholder="CONTACT NO" type="text"
                    />
                  </div>
                  <div className="app-form-group message">
                    <input className="app-form-control" placeholder="MESSAGE" type="text" name="message"/>
                  </div>
                  <div className="app-form-group buttons">
                    <button className="app-form-button">CANCEL</button>
                    <button className="app-form-button">SEND</button>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ContactPage;
