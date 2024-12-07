import { useEffect, useRef } from 'react';
import { useReactMediaRecorder } from "react-media-recorder";
import { Button } from './ui/button';

interface VideoRecorderProps {
  onRecordingComplete: (videoBlob: Blob, videoUrl: string) => void;
}

export const VideoRecorder = ({ onRecordingComplete }: VideoRecorderProps) => {
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
  
  const {
    status,
    startRecording,
    stopRecording,
    previewStream,
  } = useReactMediaRecorder({ video: true, askPermissionOnMount: true, onStop: (blobUrl, blob) => {
    onRecordingComplete(blob, blobUrl);
  } });

  useEffect(() => {
    if (videoPreviewRef.current && previewStream) {
      videoPreviewRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  return (
    <div className='flex flex-col p-2 space-y-4 text-center'>
      <p>
        {status === 'idle' || status === 'stopped' && 'Click "Start Recording" to begin recording a video.'}
        {status === 'recording' && 'Recording...'}
      </p>

      {/* Live Preview */}
      <video 
        ref={videoPreviewRef} 
        width={500} 
        height={500} 
        autoPlay 
        muted 
        className='w-full h-full rounded-md'
      />
      
      {/* Recording Controls */}
      <div className='flex space-x-2 w-full'>
        <Button onClick={startRecording} className='w-full'>Start Recording</Button>
        <Button onClick={stopRecording} className='w-full'>Stop Recording</Button>
      </div>
    </div>
  );
};
