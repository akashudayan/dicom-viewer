import React, { useState } from "react";

import "./style.css";

import toolConfig, { setToolActive } from "../toolConfig/Toolconfig";

export default function ToolBar() {
  const [selectedTool, setSelectedTool] = useState("");
  return (
    <>
      {toolConfig.map((tool) => (
        <button
          key={tool.displayName}
          className={
            selectedTool === tool.displayName
              ? "ActiveToolButton"
              : "ToolButton"
          }
          onClick={(e) => {
            setToolActive(tool.toolName);
            setSelectedTool(tool.displayName);
          }}
          style={{ marginRight: "10px" }}
        >
          {tool.displayName}
        </button>
      ))}
    </>
  );
}
