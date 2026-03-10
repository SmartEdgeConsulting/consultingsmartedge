"use client";

import React, { useEffect, useState } from "react";

const ProgressBar = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setWidth((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="fixed top-0 left-0 h-0.5 bg-gradient-primary z-50 transition-all duration-100"
      style={{ width: `${width}%` }}
    />
  );
};

export default ProgressBar;
