import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import balloon from "../images/balloon.jpg";
import bulb from "../images/bulb.jpg";
import sunset from "../images/sunset.jpg";
import tulip from "../images/tulip.jpg";

const RotatingTiltCard = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef(null);
  const images = [balloon, bulb, sunset, tulip];

  // To hold the debounce timeout reference for mouse stop detection
  const debounceTimeoutRef = useRef(null);

  // Tilt effect based on global mouse movement
  const handleMouseMove = (event) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cardX = rect.left + rect.width / 2;
    const cardY = rect.top + rect.height / 2;
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const rotationX = ((mouseY - cardY) / rect.height) * 15;
    const rotationY = ((mouseX - cardX) / rect.width) * -15;

    gsap.to(card, {
      rotationX: rotationX,
      rotationY: rotationY,
      transformPerspective: 1000,
      duration: 0.2,
      ease: "power2.out",
    });

    // Clear existing timeout to reset the tilt
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set a new timeout to reset tilt after 200ms of no movement
    debounceTimeoutRef.current = setTimeout(() => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }, 200);
  };

  // Automatically rotate the card and change the image
  const autoRotate = () => {
    const card = cardRef.current;

    gsap.to(card, {
      rotationY: "+=360",
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        // Update image index
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      },
    });
  };

  // Set up interval for automatic rotation
  useEffect(() => {
    const interval = setInterval(autoRotate, 2000); // Every 2 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Attach global mousemove listener
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      // Clear debounce timeout on unmount
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        ref={cardRef}
        style={{
          width: "300px",
          height: "400px",
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transformStyle: "preserve-3d",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "15px",
            objectFit: "cover",
            backfaceVisibility: "hidden", // Prevent back image from showing
            position: "absolute",
          }}
        />
      </div>
    </div>
  );
};

export default RotatingTiltCard;