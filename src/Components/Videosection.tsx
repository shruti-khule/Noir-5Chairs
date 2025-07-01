import React, { useRef, useEffect } from "react";
import ModelViewer from "./ModelViwer";

interface Props {
  sku: string;
}

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export const VideoSection: React.FC<Props> = ({ sku }) => (
  <section className="mt-8 flex justify-center">
    <ModelViewer
      id="ar-model"
      src="3Dimage1_atlas.glb"
      alt="3D model of an office chair"
      ar={true}
      arModes="scene-viewer quick-look"
      cameraControls={true}
      autoRotate={true}
    />
  </section>
);
