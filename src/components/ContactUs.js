import React from "react";

export default function ContactUs() {
  const submitEnquiry = (e) => {
    e.preventDefault();
  };
  return (
    <div className="contactus">
      <h1>Contact Us</h1>
      <p>Our Location</p>
      <div className="location">
        <div className="location_left">
          <p>Creative Computer Services</p>
          <p>
            CREATIVE COMPUTER SERVICES <br></br>B11 Gr. Flr. Johar Complex,
            Tilak Road, Rishikesh, Dehradun, Uttarakhand India Phone: 9412052744
          </p>
        </div>
        <div className="location_right">
          <p>Telephone</p>
          <p>9412052744</p>
          <p>8923439737</p>
          <p>8923439733</p>
        </div>
      </div>
      <h2>Contact Form</h2>
      <hr className="hrstyle"></hr>
      <form>
        <p>
          <label>Your Name</label>
          <input type="text"></input>
        </p>
        <p>
          <label>E-Mail Address</label>
          <input type="text"></input>
        </p>
        <p>
          <label>Enquiry</label>
          <textarea></textarea>
        </p>
        <button type="submit" onClick={submitEnquiry}>
          Submit
        </button>
      </form>
    </div>
  );
}
