// src/components/BentoGrid/BentoGrid.jsx
import React, { useRef } from "react";
import { cn } from "../lib/utils";
import { gsap } from "../lib/gsapConfig";
import { useGSAP } from "@gsap/react";
import { useBentoGridAnimations } from "../hooks/useBentoAnimations";
import "./BentoGrid.css";

export const BentoGrid = ({
  className,
  children,
  variant = "default",
  ...props
}) => {
  const containerRef = useRef(null);
  
  useBentoGridAnimations(containerRef);

  return (
    <div
      ref={containerRef}
      className={cn(
        "bento-grid",
        `bento-grid-${variant}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  icon,
  size = "normal",
  index = 0,
  ...props
}) => {
  const itemRef = useRef(null);

  const { contextSafe } = useGSAP(() => {
    if (!itemRef.current) return;

    const handleMouseEnter = contextSafe(() => {
      gsap.to(itemRef.current, {
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    const handleMouseLeave = contextSafe(() => {
      gsap.to(itemRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    const element = itemRef.current;
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: itemRef });

  return (
    <div
      ref={itemRef}
      className={cn(
        "bento-item",
        `bento-item-${size}`,
        className
      )}
      {...props}
    >
      <div className="bento-item-background"></div>
      
      <div className="bento-item-content">
        {icon && (
          <div className="bento-icon">
            {icon}
          </div>
        )}
        
        <div className="bento-text-group">
          {title && (
            <h3 className="bento-title">
              {title}
            </h3>
          )}
          
          {description && (
            <p className="bento-description">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};