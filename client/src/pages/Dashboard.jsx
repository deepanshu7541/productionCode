import React from 'react'
import { Helmet } from 'react-helmet'
import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
// import '../styles/Dashboard.css';
import FeatureCard21 from '../components/feature-card21';
import BlogPostCard1 from '../components/blog-post-card1';
import '../styles/home.css';

import FeatureCard1 from '../components/feature-card1';
import Marquee from "react-fast-marquee";
import { skillsData } from './skillsData';
import { skillsImage } from './skillsImage';


const Home = (props) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('auth')) || '');
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [arr, setarr] = useState([]);
  const [certiData, setCertiData] = useState([]);

  const fetchUserData = async () => {
    if (token === '') {
      return;
    }

    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get('http://api.acods.cloud/api/v1/dashboard', axiosConfig);
      // const response = await axios.get('http://localhost:3000/api/v1/dashboard', axiosConfig);
      // console.log("Inside frontend response.data");
      // setUserData(response.data);
      setProfileData(response.data);
      console.log("Hello");
      console.log(profileData);
      console.log(profileData.name);
    } catch (error) {
      toast.error(error.message);
    }
    // console.log(userData);
  };

  // const fetchCertificate = async () => {
  //   const certi = profileData.cid;
  //   console.log("Certi");
  //   console.log(certi);
  //   // certi.foreach(help);

  //   for(let i=0; i<certi.length; i++){
  //     async function help(c) {
  //       try {
  //           const url = await axios.get(`http://localhost:3000/api/v1/certificates/${c}`);
  //           console.log("My data");
  //           console.log(url.data);
  //       } catch (error) {
  //           // Handle errors
  //           console.error('Error:', error);
  //       }
  //     }
  //   }
  // }

  const fetchCertificate = async () => {
    const dd = [];
    const aa = [];
    const certi = profileData.cid;
    // console.log("Certificates:");
    // console.log(certi);

    for (let i = 0; i < certi.length; i++) {
        const c = certi[i];
        try {
            const url = await axios.get(`http://api.acods.cloud/api/v1/certificates/${c}`);
            // console.log("URL Data:");
            // console.log(url.data);

            dd.push(url.data.certificate.certificateURl);
            // console.log(url.data.certificate.certificateURl);
            aa.push(url.data.certificate);
            console.log("Certificate Data:");
            console.log(url.data.certificate);
            // console.log(dd);
        } catch (error) {
            console.error('Error fetching certificate:', error);
        }
    }

    // console.log('ABCD');
    setarr(dd); // Assuming setarr is a state setter function
    certiData.push(aa);
    console.log("Ceri data");
    console.log(certiData);
    // console.log('EFGH');
}



  useEffect(() => {
    fetchUserData();
    // fetchCertificate();
    if (token === '') {
      navigate('/login');
      toast.warn('Please login first to access the dashboard');
    }
  }, [token]);  

  useEffect(() => {
    fetchCertificate();
  }, []);

    // const { theme } = useContext(ThemeContext);

    const skillBoxStyle = {
        // backgroundColor: ,
        boxShadow: `0px 0px 30px red`
    }

    return (
      <div className="home-container">
        {/* <Helmet>
          <title>Fond Victorious Llama</title>
          <meta property="og:title" content="Fond Victorious Llama" />
        </Helmet> */}
        <div className="home-container01">
          <img
            alt="image"
            src={profileData.profileURL}
            loading="eager"
            className="home-image"
          />
        </div>
        <div className="home-container02"></div>
        <div className="home-container03">
          <h1 className="home-text">{profileData.name}</h1>
          <span className="home-text1">
            {profileData.aboutUs}
          </span>
          <div className="home-container04">
            <div className="home-social-bar">
              <img className='social-links1' src='data:image/png;base64,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' alt='github-logo' />
              <img className='social-links2' src='https://cdn.worldvectorlogo.com/logos/linkedin-icon-3.svg' alt='linkedin-logo' />

              {/* <svg viewBox="0 0 877.7142857142857 1024" className="home-icon">
                <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
              </svg> */}
              {/* <svg viewBox="0 0 602.2582857142856 1024" className="home-icon2">
                <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
              </svg> */}
            </div>
          </div>
        </div>

        <div className="skills-scroller-container">
  <div className="left-div skills-scroller">
    <h2 className="skills-heading">Skills</h2>
    <hr />
    <br />
    {profileData.skills &&
      profileData.skills.slice(0, 4).map((skillItem, index) => (
        <div key={index} className="skill-item">
          {/* <img src={skillsImage(skillItem.topic)} alt={skillItem.topic} className="skill-image"/> */}
          <div className="skill-name"><span><img src={skillsImage(skillItem.topic)} alt={skillItem.topic} className="skill-image"/></span>{skillItem.topic}</div>
          <div className="skill-bar">
            <div
              className="skill-progress"
              style={{ width: `${skillItem.percentage}%` }}
            >
              {skillItem.percentage}%
            </div>
          </div>
        </div>
      ))}
  </div>
  <div className="right-div skills-scroller">
    <br />
    {profileData.skills &&
      profileData.skills.slice(4).map((skillItem, index) => (
        <div key={index} className="skill-item">
          <div className="skill-name"><span><img src={skillsImage(skillItem.topic)} alt={skillItem.topic} className="skill-image"/></span>{skillItem.topic}</div>
          <div className="skill-bar">
            <div
              className="skill-progress"
              style={{ width: `${skillItem.percentage}%` }}
            >
              {skillItem.percentage}%
            </div>
          </div>
        </div>
      ))}
  </div>
</div>

        {/* <div className="skills-scroller-container">
              <h2 className="skills-heading">Skills</h2>
              <hr />
              <br />
              <div className="skills-scroller">
                {profileData.skills && profileData.skills.map((skillItem, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-name">{skillItem.topic}</div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{ width: `${skillItem.percentage}%` }}
                      >
                        {skillItem.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div> */}
        
          
        <div className="home-container06">
          <div className="home-container07">
            <h1 className="home-text3">Certification</h1>
            <hr />
            <br />
          </div>
          <div className="home-container08">
          <div className='home-blog'>
            <BlogPostCard1 content={certiData}
                  imageSrc="https://images.unsplash.com/photo-1547841243-eacb14453cd9?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDIyfHxjaXR5fGVufDB8fHx8MTYyNjE4NjYxMg&ixlib=rb-1.2.1&w=1000"
                  rootClassName="rootClassName1"
                ></BlogPostCard1>
          </div>
          {/* <div className='home-blog'>
            {certiData.map((item, idx) => (
              <a key={idx} href={item.certificateURl} target="_blank" rel="noopener noreferrer">
                <BlogPostCard1 content={item}
                  imageSrc="https://images.unsplash.com/photo-1547841243-eacb14453cd9?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDIyfHxjaXR5fGVufDB8fHx8MTYyNjE4NjYxMg&ixlib=rb-1.2.1&w=1000"
                  rootClassName="rootClassName1"
                ></BlogPostCard1>
              </a>
            ))}
          </div> */}

            {/* <div className="home-blog">
              <div className="home-container09">
                <BlogPostCard1 rootClassName="rootClassName3"></BlogPostCard1>
              </div>
              <div className="home-container10">
                <BlogPostCard1
                  imageSrc="https://images.unsplash.com/photo-1465925508512-1e7052bb62e6?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDIzfHxjaXR5JTIwY2FifGVufDB8fHx8MTYyNjQ1MDMwNA&amp;ixlib=rb-1.2.1&amp;h=1200"
                  rootClassName="rootClassName2"
                ></BlogPostCard1>
              </div>
              <div className="home-container11">
                <BlogPostCard1
                  imageSrc="https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDE4fHxjaXR5fGVufDB8fHx8MTYyNjQ1MDI4MQ&amp;ixlib=rb-1.2.1&amp;h=1200"
                  rootClassName="rootClassName1"
                ></BlogPostCard1>
              </div>
            </div> */}
          </div>
        </div>
        <div className="home-container12">
          <div className="home-container13">
            <h1 className="home-text4">Projects</h1>
            <hr />
            <br />
          </div>
          {/* <hr /> */}
          <div className="home-container14">
            <div className="home-features">
              <div className="home-container15">
                <FeatureCard21 content={profileData.projects} />
                {/* <FeatureCard21 rootClassName="rootClassName3"></FeatureCard21> */}
                {/* <FeatureCard21 rootClassName="rootClassName2"></FeatureCard21> */}
                {/* <FeatureCard21 rootClassName="rootClassName1"></FeatureCard21> */}
              </div>
            </div>
          </div>
        </div>
        <div className="home-container69">
          <div className="home-container169">
            <div className="home-features69">
              <h1 className="home-text69">Tools</h1>
              <hr />
              <div className="home-container269">
                <FeatureCard1
                  title="HTML"
                  imageSrc="https://www.w3.org/html/logo/downloads/HTML5_Badge_512.png"
                  rootClassName="rootClassName"
                ></FeatureCard1>
                <FeatureCard1
                  title="JavaScript"
                  imageSrc="https://cdn.iconscout.com/icon/premium/png-256-thumb/javascript-2752148-2284965.png?f=webp"
                  rootClassName="rootClassName1"
                ></FeatureCard1>
                <FeatureCard1
                  title="React"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/1200px-React_Logo_SVG.svg.png"
                  rootClassName="rootClassName2"
                ></FeatureCard1>
                <FeatureCard1
                  title="MongoDB"
                  imageSrc="https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_wordmark_logo_icon_146425.png"
                  rootClassName="rootClassName7"
                ></FeatureCard1>
                <FeatureCard1
                  title="CSS"
                  imageSrc="https://logowik.com/content/uploads/images/123_css3.jpg"
                  rootClassName="rootClassName3"
                ></FeatureCard1>
                <FeatureCard1
                  title="MySQL"
                  imageSrc="https://upload.wikimedia.org/wikipedia/commons/7/7b/MySQL_Dolphin.jpg"
                  rootClassName="rootClassName6"
                ></FeatureCard1>
                <FeatureCard1
                  title="Node Js"
                  imageSrc="https://static-00.iconduck.com/assets.00/node-js-icon-227x256-913nazt0.png"
                  rootClassName="rootClassName5"
                ></FeatureCard1>
                <FeatureCard1
                  title="Angular"
                  imageSrc="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/21_Angular_logo_logos-512.png"
                  rootClassName="rootClassName4"
                ></FeatureCard1>
              </div>
            </div>
          </div>
        </div>
        <div className="home-container16">
          <Link to='/logout' type="button" className="button home-button">
            Log out 
          </Link>
        </div>
      </div>
    
    
//     <div className="home-container">
//       <Helmet>
//         <title>Presentation Page</title>
//         <meta property="og:title" content="Presentation Page" />
//       </Helmet>
//       <div data-role="Header" className="home-navbar-container">
//         <div className="home-navbar">
//           <div className="home-logo">
//             <a
//               href="https://certification.metafiser.tech/wp-content/uploads/2024/01/cropped-Colour-1-190x63.png"
//               target="_blank"
//               rel="noreferrer noopener"
//               className="home-link"
//             >
//               <img alt="image" src="/default-img.svg" className="home-image" />
//             </a>
//           </div>
//           <div className="home-links-container">
//             <a href="#features" className="home-link1 Anchor">
//               Logout Page
//             </a>
//             <a href="#services" className="home-link2 Anchor">
//               Password Reset Page
//             </a>
//             <a href="#about-us" className="home-link3 Anchor">
//               Account Page
//             </a>
//             <span className="home-link4 Anchor">Member Page</span>
//           </div>
//           <div className="home-cta-container">
//             <button className="home-cta-btn button">Verification</button>
//             <div data-role="BurgerMenu" className="home-burger-menu">
//               <svg viewBox="0 0 1024 1024" className="home-icon">
//                 <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
//               </svg>
//             </div>
//           </div>
//           <div data-role="MobileMenu" className="home-mobile-menu">
//             <div className="home-top">
//               <img alt="image" src="/default-img.svg" className="home-image1" />
//               <div data-role="CloseMobileMenu" className="home-container1">
//                 <svg viewBox="0 0 1024 1024" className="home-icon02">
//                   <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
//                 </svg>
//               </div>
//             </div>
//             <div className="home-mid">
//               <div className="home-links-container1">
//                 <a href="#features" className="home-link5 Anchor">
//                   features
//                 </a>
//                 <a href="#services" className="home-link6 Anchor">
//                   services
//                 </a>
//                 <a href="#about-us" className="home-link7 Anchor">
//                   About Us
//                 </a>
//                 <span className="home-link8 Anchor">contact</span>
//               </div>
//               <button className="home-cta-btn1 Anchor button">
//                 START BUILDING
//               </button>
//             </div>
//             <div className="home-bot">
//               <div className="home-social-links-container">
//                 <svg
//                   viewBox="0 0 950.8571428571428 1024"
//                   className="home-icon04"
//                 >
//                   <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
//                 </svg>
//                 <svg
//                   viewBox="0 0 877.7142857142857 1024"
//                   className="home-icon06"
//                 >
//                   <path d="M713.143 73.143c90.857 0 164.571 73.714 164.571 164.571v548.571c0 90.857-73.714 164.571-164.571 164.571h-107.429v-340h113.714l17.143-132.571h-130.857v-84.571c0-38.286 10.286-64 65.714-64l69.714-0.571v-118.286c-12-1.714-53.714-5.143-101.714-5.143-101.143 0-170.857 61.714-170.857 174.857v97.714h-114.286v132.571h114.286v340h-304c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571z"></path>
//                 </svg>
//                 <svg
//                   viewBox="0 0 877.7142857142857 1024"
//                   className="home-icon08"
//                 >
//                   <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="home-hero">
//         <div className="home-hero-text-container">
//           <h1 className="home-heading">{profileData.name}</h1>
//           <span className="home-text">{profileData.email}</span>
//           <button className="home-cta-btn2 button Anchor">
//             START BUILDING
//           </button>
//         </div>
//         <img
//           alt="image"
//           src="https://images.unsplash.com/photo-1619314528204-59477dba78d2?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;w=1000"
//           className="home-image2"
//         />
//       </div>
//       <div className="home-section-separator"></div>
//       <div id="features" className="home-features">
//         <div className="home-heading-container">
//           <h2 className="home-text01 Section-Heading">CERTIFICATE</h2>
//           <span className="home-text02">Certificate Awarded to candidate</span>
//         </div>
//         <div className="home-cards-container">
//           <div className="home-feature-card">
//             <img
//               alt="image"
//               src="https://images.unsplash.com/photo-1619548683455-23b17c3ddc30?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;h=1000"
//               className="home-image3"
//             />
//             <span className="home-heading1">
//               <span className="Card-Heading">{profileData.aboutUs}</span>
//               <br></br>
//               <span>Certificate</span>
//               <br></br>
//             </span>
//           </div>
//           <div className="home-feature-card1">
//             <img
//               alt="image"
//               src="https://images.unsplash.com/photo-1619547871672-b6562e042c1e?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;h=1000"
//               className="home-image4"
//             />
//             <span className="home-heading2">
//               <span className="Card-Heading">METAFISER</span>
//               <br></br>
//               <span>Certificate</span>
//               <br></br>
//             </span>
//           </div>
//           <div className="home-feature-card2">
//             <img
//               alt="image"
//               src="https://images.unsplash.com/photo-1619555241737-9c364cf1fbce?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;h=1000"
//               className="home-image5"
//             />
//             <span className="home-heading3 Card-Heading">PROJECT AWARD</span>
//           </div>
//         </div>
//       </div>
//       {/* <ul className="list">
//         <li className="list-item">
//           <span>Text</span>
//         </li>
//         <li className="list-item">
//           <span>Text</span>
//         </li>
//         <li className="list-item">
//           <span>Text</span>
//         </li>
//       </ul> */}

// <div className="home-container">
//       <Helmet>
//         {/* ... existing helmet content ... */}
//       </Helmet>
//       <div data-role="Header" className="home-navbar-container">
//         {/* ... existing navbar content ... */}
//       </div>
//       <div className="home-hero">
//         {/* ... existing hero content ... */}
//       </div>
      
//       {/* Add SkillsScroller component here */}
//       <SkillsScroller />

//       <div className="home-section-separator"></div>
//       <div id="features" className="home-features">
//         {/* ... existing features content ... */}
//       </div>
//       {/* ... rest of your Home component ... */}
//     </div>
  

//       {/* <div id="services" className="home-services">
//         <div className="home-service-card">
//           <div className="home-card-content">
//             <h3 className="home-text14 BigCard-Heading">Certificates</h3>
//             <span className="home-text15 Card-Text">
//               Certificates details
//               <span
//                 dangerouslySetInnerHTML={{
//                   __html: ' ',
//                 }}
//               />
//             </span>
//             <button className="home-button button Anchor">READ MORE</button>
//           </div>
//         </div>
//         <div className="home-service-card1">
//           <div className="home-card-content1">
//             <h3 className="home-text16 BigCard-Heading">Certificate</h3>
//             <span className="home-text17 Card-Text">
//               Certificate details
              
//               <span
//                 dangerouslySetInnerHTML={{
//                   __html: ' ',
//                 }}
//               />
//             </span>
//             <button className="home-button1 button Anchor">READ MORE</button>
//           </div>
//         </div>
//         <div className="home-service-card2">
//           <div className="home-card-content2">
//             <h3 className="home-text18 BigCard-Heading">Service name</h3>
//             <span className="home-text19 Card-Text">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
//               nec odio. Praesent libero.
//               <span
//                 dangerouslySetInnerHTML={{
//                   __html: ' ',
//                 }}
//               />
//             </span>
//             <button className="home-button2 Anchor button">READ MORE</button>
//           </div>
//         </div>
//         <div className="home-service-card3">
//           <div className="home-card-content3">
//             <h3 className="home-text20 BigCard-Heading">Service name</h3>
//             <span className="home-text21 Card-Text">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
//               nec odio. Praesent libero.
//               <span
//                 dangerouslySetInnerHTML={{
//                   __html: ' ',
//                 }}
//               />
//             </span>
//             <button className="home-button3 button Anchor">READ MORE</button>
//           </div>
//         </div>
//       </div> */}

//       <div id="about-us" className="home-about-us">
//         <div className="home-heading-container1">
//           <h2 className="home-text22 Section-Heading">Projects</h2>
//           <span className="home-secondary-text">
//             <span>Project details by student</span>
//             <br></br>
//           </span>
//         </div>
//         <div className="home-text-container">
//           <span className="home-text25">
//             <span className="Section-Text">
//               Project: Personalized Customer Experience Chatbot Development
//             </span>
//             <br className="home-text27"></br>
//             <br className="Section-Text"></br>
//             <span className="Section-Text">Tech Used: NLP, Python, KAFKA</span>
//             <br className="home-text30"></br>
//             <br className="Section-Text"></br>
//             <br className="home-text32"></br>
//             <br className="Section-Text"></br>
//             <span className="Section-Text">
//               Project: Intelligent Conversational Agent: Multi-Document Reader
//               and Chatbot Integration with LangChain and ChatGPT
//             </span>
//             <br className="home-text35"></br>
//             <br className="Section-Text"></br>
//             <span className="Section-Text">
//               Tech Used: NLP, Python, Lanchain, OpenAI
//             </span>
//             <br className="home-text38"></br>
//             <br className="Section-Text"></br>
//             <br className="home-text40"></br>
//             <br className="Section-Text"></br>
//             <span className="Section-Text">
//               Project: Real-Time Facial Emotion Recognition System
//             </span>
//             <br className="home-text43"></br>
//             <br className="Section-Text"></br>
//             <span className="Section-Text">Tech Used: NLP, Python, KAFKA</span>
//           </span>
//         </div>
//         <button className="home-cta-btn3 button Anchor">START BUILDING</button>
//       </div>
//       <div className="home-section-separator1"></div>
//       <Link to="/logout" className="logout-button">Logout</Link>

//     </div>
  )
}
export default Home


// Dashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const Dashboard = () => {
  // const [token, setToken] = useState(JSON.parse(localStorage.getItem('auth')) || '');
  // const [userData, setUserData] = useState({});
  // const navigate = useNavigate();

  // const fetchUserData = async () => {
  //   if (token === '') {
  //     return;
  //   }

  //   try {
  //     const axiosConfig = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };

  //     const response = await axios.get('http://localhost:3000/api/v1/dashboard', axiosConfig);
  //     setUserData(response.data);
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  //   console.log(userData);
  // };

  // useEffect(() => {
  //   fetchUserData();
  //   if (token === '') {
  //     navigate('/login');
  //     toast.warn('Please login first to access the dashboard');
  //   }
  // }, [token]);

//   return (
//     <div className='dashboard-main'>
//       <h1>{userData.name}'s Dashboard</h1>
//       <p>Email: {userData.email}</p>
//       <p>Certificate ID: {userData.password}</p>
//       <p>About Us: {userData.aboutUs}</p>
//       {/* Add other user details */}
//       <Link to='/logout' className='logout-button'>
//         Logout
//       </Link>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useEffect, useState } from 'react'
// import "../styles/Dashboard.css";
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const Dashboard = () => {
//   const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("auth")) || "");
//   const [ data, setData ] = useState({});
//   const navigate = useNavigate();

//   const fetchLuckyNumber = async () => {

//     let axiosConfig = {
//       headers: {
//         'Authorization': `Bearer ${token}`
//     }
//     };

//     try {
//       const response = await axios.get("http://localhost:3000/api/v1/dashboard", axiosConfig);
//       setData(response.data);
//       // setData({ msg: response.data.msg, luckyNumber: response.data.secret });
//     } catch (error) {
//       toast.error(error.message);
//     }
//   }


  
//   useEffect(() => {
//     fetchLuckyNumber();
//     if(token === ""){
//       navigate("/login");
//       toast.warn("Please login first to access dashboard");
//     }
//   }, [token]);

//   return (
//     <div className='dashboard-main'>
//       <h1>Hiiiiiiii{ data.email }</h1>
//       <h1>Dashboard</h1>
//       <p>Hi { data.msg }! { data.luckyNumber }</p>
      // <Link to="/logout" className="logout-button">Logout</Link>
//     </div>
//   )
// }

// export default Dashboard
