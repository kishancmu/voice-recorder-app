import { useRef, useEffect, useState } from "react";
import Button from "../Button/Button";
import wavesImage from "../../assets/waves.gif";
import {
  BsFillStopFill,
  BsPlayFill,
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillMicFill,
  BsFillMicMuteFill,
} from "react-icons/bs";
import "./Recorder.css";
import Waveform from "../Waveform/Waveform";

const Recorder = () => {
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isRecorded, setIsRecorded] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{
    error: boolean;
    msg: string;
  }>({
    error: false,
    msg: "",
  });
  const [chunks, setChunks] = useState<ArrayBuffer[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [timer, setTimer] = useState<number>(-1);
  const mediaRecorder = useRef<any>(null);
  const waveSurferRef = useRef<any>({
    isPlaying: () => false,
  });

  const countDownRef = useRef<any>(null);

  /* Recording start when timer reached to 0 */
  useEffect(() => {
    if (timer === 0) {
      mediaRecorder.current.start();
    }
  }, [timer]);

  /* Setup the countdown timer for 3 seconds */
  useEffect(() => {
    countDownRef.current = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => {
      clearInterval(countDownRef.current);
    };
  }, [timer]);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then((stream: MediaStream) => {
          setStream(stream);
        })
        .catch((err) => {
          setErrorMessage({
            error: true,
            msg: "Please allow microphone access",
          });
          setIsRecording(false);
          setChunks([]);
        });
    } else {
      setErrorMessage({ error: true, msg: "Oops! we ran into issues" });
    }
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    setTimer(3);
    if (stream) {
      const media = new MediaRecorder(stream);
      mediaRecorder.current = media;
      let localAudioChunks: any = [];
      mediaRecorder.current.ondataavailable = (e: any) => {
        localAudioChunks.push(e.data);
      };
      setChunks(localAudioChunks);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    /* Resets the timer */
    clearInterval(countDownRef.current);
    setTimer(-1);
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      if (chunks.length !== 0) {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const audioURL = window.URL.createObjectURL(blob);
        setAudioSrc(audioURL);
        setChunks([]);
        setIsRecorded(true);
      }
    };
  };

  const handlePlayButtonClick = () => {
    waveSurferRef.current.setVolume(20);
    waveSurferRef.current.playPause();
    setIsPlaying(!isPlaying);
  };

  const handleRetryButtonClick = () => {
    setAudioSrc("");
    setIsPlaying(false);
    setIsRecorded(false);
  };

  return (
    <div className="recorder-container">
      <div className="flexGrowContainer">
        <div className="textBox">
          <p className="instruction">SAY THE SENTENCE BELOW</p>
          <p>
            Transform your voice into the target voice with real-time realistic
            speech-to-speech. Granular control over every inflection and
            intonation.
          </p>
        </div>
        <div className="graph">
          <div className="messagesContainer">
            {isRecording && timer > 0 && (
              <div className="timerContainer">
                <span className="text">Recording starts in</span>
                <span className="countDown">{timer}</span>
              </div>
            )}
            {errorMessage.error && !isRecorded && (
              <div className="errorMessageContainer">
                <div className="icon">
                  <BsFillMicMuteFill />
                </div>
                <span className="text">{errorMessage.msg}</span>
              </div>
            )}
            {timer === 0 &&
              !errorMessage.error &&
              !isRecorded &&
              isRecording && (
                <div className="recordingContainer">
                  <img src={wavesImage} alt="waves" />
                  <p className="text recording">Recording</p>
                </div>
              )}
            {!errorMessage.error && !isRecorded && !isRecording && (
              <span className="text">Click record to start recording</span>
            )}
            {/* Showing waveform of the recorded audio */}
            {audioSrc && (
              <Waveform
                audio={audioSrc}
                waveSurferRef={waveSurferRef}
                audioFinishEvent={() => {
                  setIsPlaying(false);
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="buttons-container">
        <Button
          isDisabled={isRecording || isRecorded || errorMessage.error}
          onClick={startRecording}
          label="Record"
        />
        <Button
          isDisabled={!isRecording}
          onClick={stopRecording}
          label="Stop"
        />
        <Button
          isDisabled={!isRecorded}
          onClick={handlePlayButtonClick}
          label={isPlaying ? "Pause" : "Play"}
        />
        <Button
          isDisabled={!isRecorded}
          onClick={handleRetryButtonClick}
          label="Retry"
        />
      </div>
    </div>
  );
};

export default Recorder;
