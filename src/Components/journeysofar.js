import React from "react";
import "./JourneySoFar.css"; // Importing CSS file

const JourneySoFar = () => {
  const stages = [
    {
      stage: "Stage 1:",
      title: "Idea Conceptualization",
      description:
        "The project began with brainstorming the idea of creating a bus tracker to provide real-time bus tracking information for passengers. We discussed the scope, the key features, and how we could implement this with available technologies.",
      date: "Date: [Insert Date]",
    },
    {
      stage: "Stage 2:",
      title: "Research & Planning",
      description:
        "We researched existing solutions, studied different APIs for tracking, and explored the necessary hardware like GPS modules. This phase included feasibility studies and outlining a detailed project plan.",
      date: "Date: [Insert Date]",
    },
    {
      stage: "Stage 3:",
      title: "Setting up Backend",
      description:
        "We focused on setting up the server-side logic, including creating endpoints to handle requests from the mobile app. This included integrating third-party APIs or handling GPS data from buses to provide live tracking.",
      date: "Date: [Insert Date]",
    },
    {
      stage: "Stage 4:",
      title: "Building the Frontend",
      description:
        "The frontend development began using React. We built an interface to show bus locations on a map and allow users to track bus arrival times. We also worked on ensuring a responsive and user-friendly design.",
      date: "Date: [Insert Date]",
    },
    {
      stage: "Stage 5:",
      title: "Testing & Refinement",
      description:
        "We tested the system in various environments to ensure reliability. This included beta testing with real bus data to identify issues and refine the functionality for a smoother user experience.",
      date: "Date: [Insert Date]",
    },
    {
      stage: "Stage 6:",
      title: "Future Improvements",
      description:
        "We are now looking into potential improvements, like integrating advanced features such as bus route predictions, notifications for delays, and ensuring better scalability for broader use.",
      date: "Ongoing",
    },
  ];

  return (
    <div className="timeline">
      <div className="timeline-box">
      {stages.map((stage, index) => (
        <div className="timeline-item" key={index}>
          <div className="timeline-content">
            <h2>{stage.stage}</h2>
            <h2>{stage.title}</h2>
            <p>{stage.description}</p>
            {/* <p><strong>{stage.date}</strong></p> */}
          </div>
          {/* Add arrows between the stages */}
          <div className="timeline-arrow"></div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default JourneySoFar;