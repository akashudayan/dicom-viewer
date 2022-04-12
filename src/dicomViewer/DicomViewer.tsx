import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";
import React, { useEffect, useState } from "react";
import { studyInstances } from "../sampleData/SampleData";
import ToolBar from "../toolBar/ToolBar";
import ToolConfig from "../toolConfig/interface";
import toolConfig from "../toolConfig/Toolconfig";
import "./style.css";

const DicomViewer = () => {
  const [imageIds, setImageIds] = useState<Array<string>>([]);
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [selectedStackIndex, setSelectedStackIndex] = useState<number>(0);

  function resetViewPort() {
    const element = document.getElementById("dicomImage");
    cornerstone.reset(element);
    cornerstone.updateImage(element);
  }

  function loadAnnotations() {
    const annotationData = localStorage.getItem("annotations");

    if (annotationData !== undefined && annotationData !== null) {
      const annotations = JSON.parse(annotationData);

      for (const imageId in annotations) {
        const ToolStateManager =
          cornerstoneTools.globalImageIdSpecificToolStateManager;
        ToolStateManager.restoreImageIdToolState(imageId, annotations[imageId]);

        for (let toolName in annotations[imageId]) {
          cornerstoneTools.setToolPassive(toolName);
        }
      }
    }
  }

  useEffect(() => {
    const stack = studyInstances[selectedStackIndex];

    const element = document.getElementById("dicomImage");

    cornerstone.enable(element);

    toolConfig.forEach((tool: ToolConfig) => {
      const toolName = cornerstoneTools[`${tool.toolName}Tool`];
      cornerstoneTools.removeTool(
        toolName,
        tool.configuration && { configuration: tool.configuration }
      );
    });

    cornerstone.loadImage(stack.imageIds[imgIndex]).then(
      function (image: any) {
        cornerstone.displayImage(element, image);

        cornerstoneTools.addStackStateManager(element, ["stack"]);
        cornerstoneTools.addToolState(element, "stack", stack);
      },
      function (err: any) {
        console.log(err);
      }
    );

    loadAnnotations();

    setImageIds(stack.imageIds);

    setTimeout(() => {
      stack.imageIds.forEach((imageId: string) => {
        const thumbnailElement = document.getElementById(imageId);
        cornerstone.enable(thumbnailElement);
        cornerstone.loadImage(imageId).then((image: any) => {
          cornerstone.displayImage(thumbnailElement, image);
        });
      });
    }, 100);
  }, [imgIndex, selectedStackIndex]);

  useEffect(() => {
    console.log("useEffect tool loader");

    toolConfig.forEach((tool: ToolConfig) => {
      const toolName = cornerstoneTools[`${tool.toolName}Tool`];
      cornerstoneTools.addTool(
        toolName,
        tool.configuration && { configuration: tool.configuration }
      );
    });

    const element = document.getElementById("dicomImage");
    cornerstone.enable(element);

    // logic to change selected thumbnail image on scroll
    element!.addEventListener("cornerstonetoolsstackscroll", function (e) {
      // @ts-ignore
      setImgIndex(e.detail.newImageIdIndex);
    });
  }, []);

  const onSave = () => {
    var toolState =
      cornerstoneTools.globalImageIdSpecificToolStateManager.saveToolState();
    console.log(toolState);
    localStorage.setItem("annotations", JSON.stringify(toolState));
  };

  return (
    <div className="Container">
      <div className="header-container">
        <header className="App-header">Dicom Viewer</header>
        <div>
          <button className="Button-primary" onClick={() => onSave()}>
            Save
          </button>
          <button className="Button-primary" onClick={() => resetViewPort()}>
            Reset
          </button>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {studyInstances.map((item, index) => (
          <div
            key={item.imageIds[0]}
            className="Button-primary Series-button"
            onClick={() => setSelectedStackIndex(index)}
          >
            Series {index + 1}
          </div>
        ))}
      </div>

      <div className="Viewer-conatiner">
        <div className="ToolBar">
          <ToolBar />
        </div>

        <div className="Dicom-viewer" id="dicomImage" />
        <div className="Thumbnail-container">
          {imageIds.map((imageId, index) => (
            <div key={imageId} onClick={() => setImgIndex(index)}>
              <div
                key={imageId}
                className={
                  imgIndex === index
                    ? "Active-thumbnail-viewer"
                    : "Thumbnail-viewer"
                }
                id={imageId}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DicomViewer;
