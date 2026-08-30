import React from "react";

/**
 * Tilt3DCard - Clean, stable card wrapper with zero tilt rotation.
 */
const Tilt3DCard = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`relative w-full ${className}`}
      {...props}
    >
      <div className="relative w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default Tilt3DCard;
