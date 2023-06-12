import React from "react";

const CustomFooter = () => {
  return (
    <footer id="site-footer" className="nav-white-desktop" role="contentinfo">
      <div id="footer-wave" />
      <div className="footer-bg">
        <div className="footer-inner container-xl">
          <div className="footer-top">
            <div className="row">
              <div className="ft-col-1 col-sm-12 col-lg-4">
                <div className="widget widget_text">
                  <div className="widget-content">
                    <div className="textwidget">
                      <h4 className="text-center">NYA Worldwide</h4>
                      <p>
                        Create your custom design product and order by using our
                        system.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ft-col-2 col-sm-12 col-lg-4">
                <div className="widget widget_text">
                  <div className="widget-content">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="textwidget">
                      <p>202 Helga Springs Rd, Crawford, TN 38554</p>
                      <p>
                        Call Us:{" "}
                        <strong>
                          <a href="tel:800.275.8777">800.275.8777</a>
                        </strong>
                      </p>
                      <p>
                        <a href="mailto:alex@company.com">alex@company.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ft-col-3 col-lg-4">
                <div className="widget widget_mc4wp_form_widget">
                  <div className="widget-content">
                    <h4 className="widget-title">Sign Up for Email Updates</h4>
                    <form
                      id="mc4wp-form-1"
                      className="mc4wp-form mc4wp-form-2016"
                    >
                      <div className="mc4wp-form-fields">
                        <div className="theme-mailchimp">
                          <div className="theme-mailchimp-fields">
                            <input
                              type="email"
                              name="email"
                              placeholder="Your e-mail adress"
                              required=""
                            />
                            <input type="submit" defaultValue="Subscribe" />
                          </div>
                          <p>
                            Sign up with your email address to receive news and
                            updates
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright text-center w-100 mb-3">
              Copyright © 2023 NYA Worldwide. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
