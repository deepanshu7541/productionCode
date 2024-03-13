import React from 'react';
import './SkillsScroller.css';  // Make sure to create the necessary CSS file

const SkillsScroller = () => {
  const skillsData = [
    { skill: 'JavaScript', percentage: 80 },
    { skill: 'React', percentage: 90 },
    { skill: 'HTML/CSS', percentage: 50 },
    // Add more skills as needed
  ];

  return (
    <div className="skills-scroller-container">
      <h2 className="skills-heading">Skills</h2>
      <div className="skills-scroller">
        {skillsData.map((skillItem, index) => (
          <div key={index} className="skill-item">
            <div className="skill-name">{skillItem.skill}</div>
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
  );
};

export default SkillsScroller;
