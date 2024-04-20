import React, { useState } from "react";

export default function Family({ familyTree }) {
  const [isVisible, setIsVisible] = useState(false);
console.log(Object.values(familyTree));
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
console.log();
  return (
    <div style={{ paddingLeft: 10 }}>
      <ul>
        {Object.values(familyTree).map((member) => (
          <li key={member.name}>
            <div onClick={toggleVisibility}>{member.name}</div>
            {isVisible && member.children && (
              <Family familyTree={member.children} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
