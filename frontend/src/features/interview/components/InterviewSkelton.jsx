import React from "react";
import "../style/interview.scss";

const InterviewSkeleton = () => {
  return (
    <div className="interview-page">
      <div className="interview-layout">

        {/* Left Nav Skeleton */}
        <nav className="interview-nav">
          <div className="nav-content">
            <div className="skeleton skeleton-text w-60"></div>

            {[1,2,3].map(i => (
              <div key={i} className="skeleton skeleton-nav"></div>
            ))}
          </div>

          <div className="skeleton skeleton-button"></div>
        </nav>

        <div className="interview-divider" />

        {/* Center Content Skeleton */}
        <main className="interview-content">

          <div className="skeleton skeleton-back"></div>

          <div className="content-header">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-count"></div>
          </div>

          <div className="q-list">
            {[1,2,3,4].map(i => (
              <div key={i} className="skeleton skeleton-card">
                <div className="skeleton skeleton-q"></div>
                <div className="skeleton skeleton-line"></div>
              </div>
            ))}
          </div>

        </main>

        <div className="interview-divider" />

        {/* Right Sidebar Skeleton */}
        <aside className="interview-sidebar">

          <div className="skeleton skeleton-circle"></div>
          <div className="skeleton skeleton-line"></div>

          <div className="sidebar-divider" />

          <div className="skeleton skeleton-line"></div>

          <div className="skill-gap-skeleton">
            {[1,2,3,4].map(i => (
              <div key={i} className="skeleton skeleton-tag"></div>
            ))}
          </div>

        </aside>

      </div>
    </div>
  );
};

export default InterviewSkeleton;