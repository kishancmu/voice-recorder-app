import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import "./Waveform.css";

interface WaveformProps {
  audio: string;
  waveSurferRef: any;
  audioFinishEvent: any;
}

const Waveform: React.FC<WaveformProps> = (props: WaveformProps) => {
  const { audio, waveSurferRef, audioFinishEvent } = props;
  const containerRef: any = useRef();
  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      barWidth: 3,
      barHeight: 10,
      barRadius: 2,
      cursorWidth: 0,
      height: 160,
      hideScrollbar: true,
      fillParent: true,
      progressColor: "#fafafa",
      waveColor: "#ce93d8",
    });
    waveSurfer.load(audio);
    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
    });

    waveSurfer.on("finish", () => {
      audioFinishEvent();
    });

    return () => {
      waveSurfer.destroy();
    };
  }, [audio]);

  return <div ref={containerRef} className="waveformContainer"></div>;
};

export default Waveform;
