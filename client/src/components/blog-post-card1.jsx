import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import './blog-post-card1.css'

const BlogPostCard1 = (props) => {
  const { content } = props;
  console.log('co0000000ntent', content);
  // console.log(content);
  const [project, setProject] = useState({});

  const handleClick = () => {
    // Redirect to a different route
    history.push();
  };

  const fetchData = async () => {
    const certi = content.cid;

    const url = await axios.get(`http://localhost:3000/api/v1/certificates/${certi}`);
    if (token === '') {
      return;
    }

    // console.log(userData);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <>
      {/* <div className={`blog-post-card1-blog-post-card ${props.rootClassName} `}>
          <img
            alt={props.imageAlt}
            src={props.imageSrc}
            className="blog-post-card1-image"
          />
          <div className="blog-post-card1-container">
            <span className="blog-post-card1-text">CPD</span>
            <button type="button" className="button">
              {props.download}
            </button>
          </div>
        </div> */}
      {content[0] && content[0].map((item, idx) => (
        <div className={`blog-post-card1-blog-post-card ${props.rootClassName} `}>
          <img
            alt={props.imageAlt}
            src={item.image}
            className="blog-post-card1-image"
          />
          <div className="blog-post-card1-container">
            <span className="blog-post-card1-text">{item.name}</span>
            <a href={item.certificateURl} target="_blank" rel="noopener noreferrer">
              <button type="button" className="button">
                {props.download}
              </button>
            </a>
          </div>
        </div>
      ))}
    </>
  )
}

BlogPostCard1.defaultProps = {
  time: '5 min read',
  title: 'Lorem ipsum dolor sit amet',
  imageSrc:
    'https://images.unsplash.com/photo-1547841243-eacb14453cd9?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDIyfHxjaXR5fGVufDB8fHx8MTYyNjE4NjYxMg&ixlib=rb-1.2.1&w=1000',
  profileAlt: 'Download',
  author: 'Jon Doe',
  rootClassName: '',
  label: 'ENTERPRISE',
  download: 'Download',
  description:
    'Lorem ipsum dolor sit amet, consectetur, adipiscing elit. Sed non volutpat turpis.  ​ Mauris luctus rutrum mi ut rhoncus. Integer in dignissim tortor. Lorem  ​​ ipsum dolor sit amet, consectetur adipiscing elit.',
  imageAlt: 'image',
  profileSrc:
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDd8fG1hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTYyNjQzMTMwMw&ixlib=rb-1.2.1&h=1200',
}

BlogPostCard1.propTypes = {
  time: PropTypes.string,
  title: PropTypes.string,
  imageSrc: PropTypes.string,
  profileAlt: PropTypes.string,
  author: PropTypes.string,
  rootClassName: PropTypes.string,
  label: PropTypes.string,
  download: PropTypes.string,
  description: PropTypes.string,
  imageAlt: PropTypes.string,
  profileSrc: PropTypes.string,
}

export default BlogPostCard1
