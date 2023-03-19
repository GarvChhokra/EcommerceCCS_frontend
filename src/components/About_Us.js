import React from "react";

export default function About_Us(props) {
  return (
    <div className="aboutUs">
      <>
        <h1>About Us</h1>
        <p>
          Creative Computer Services is in business since October 2000 and in
          last 20 years the company is working across Uttarakhand and providing
          technical solutions in hardware and software to various clients in
          Rishikesh, Dehradun etc. The list below gives a high-level view of the
          clientele and business lines
        </p>
        <ul>
          <strong>Client List</strong>
          {props.client.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
        <ul>
          <strong>Business Lines</strong>
          <li>
            HARDWARE BUSINESS - HP WORLD- HP RETAIL OUTLET- COMPUTER HARDWARE,
            LAPTOPS, DESKTOPS, PRINTERS AND COMPUTER ACCESSORIES.
          </li>
          <li>
            SOFTWARE BUSINESS - TALLY - 3 STAR SALES & IMPLEMENTATION PARTNER,
            SCHOOL FEE SOFTWARE ETC., QUICK HEAL AND ESCAN ANTIVIRUS.
          </li>
          <li>
            SOLUTIONS BUSINESS - CCTV CAMERA INSTALLATION AND MAINTENANCE-
            CPPLUS, HIKVISION,DAHUA ETC.
          </li>
          <li>
            SOLUTIONS BUSINESS - CCTV CAMERA INSTALLATION AND MAINTENANCE-
            CPPLUS, HIKVISION,DAHUA ETC.
          </li>
          <li>
            UPS - OFFLINE AND ONLINE UPS INSTALLATION IN HOSPITALS AND HOTELS
            ETC.
          </li>
          <li>
            UPS - OFFLINE AND ONLINE UPS INSTALLATION IN HOSPITALS AND HOTELS
            ETC.
          </li>
        </ul>
      </>
    </div>
  );
}
