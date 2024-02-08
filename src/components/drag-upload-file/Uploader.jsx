
import React, { useCallback, useRef, useState } from 'react';
import uploadFileIcon from '../../assets/upload-file-icon.png';
import './Uploader.css';
import Progress from '../progress';

export const DragAndDrop = () => {
  const [zoomState, setZoomState] = useState(false);
  const [needFlip, setNeedFlip] = useState(false);
  const [uploadFail, setUploadFail] = useState(false);
  const [fileName, setFileName] = useState('');
  const [percent, setPercent] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');

  const resetState = () => {
    setUploadFail(false);
    setFileName('');
    setZoomState(false);
  }

  const dropZoneRef = useRef(null);
  const inputRef = useRef(null);
  const videoPreviewRef = useRef(null);

  const verifyFileIsImageMovieAudio = (file) => {
    // verifies the file extension is one we support.
    var extension = file.name.split('.').pop().toLowerCase(); //file.substr( (file.lastIndexOf('.') +1) );
    switch (extension) {
        case 'mp4':
            return file
        case 'mp3':
            return file
        case 'wav':
            return file
        default:
            return null
    }
  }

  const onChange = (e) => {
    e.preventDefault();
    resetState();
    const fileList = inputRef.current.files;
    if (fileList.length === 0) return;
    Array.from(fileList).forEach((file) => {
        previewFile(file);
    });
    setNeedFlip(true);
    setTimeout(()=>{
      setNeedFlip(false);
    }, 1000)
    if (uploadFail) return;
    setTimeout(()=>{
      setFileName(fileList?.[0].name);
      startProgressAnimation();
    }, 800);
  }

  const previewFile = (file) => {
    const vidDom = document.getElementById("video_player");
    const vPreviewDom = document.getElementById("video_preview");
    console.log(file.name)
    const myFile = verifyFileIsImageMovieAudio(file);
    if (myFile) {
        // Check the size of the file (in bytes)
        const fileSizeInBytes = myFile.size;
        // Convert file size to megabytes
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

        if (fileSizeInMB > 50) {
            displayErrorBox("Video must be under 50mb");
            setUploadFail(true);
        } else {
          // Get video player
          const newUrl = URL.createObjectURL(file);
          vPreviewDom.src = newUrl;
          vidDom.load();
          setVideoUrl(newUrl);
          file_to_be_translated = file;
        }
    } else {
        setUploadFail(true);
        displayErrorBox("File type isn't supported. ")
    }
  }

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setZoomState(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setZoomState(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    resetState()
    const fileList = e.dataTransfer.files;
    if (fileList.length === 0) return;
    Array.from(fileList).forEach((file) => {
        previewFile(file);
    });
    setNeedFlip(true);
    setTimeout(()=>{
      setNeedFlip(false);
    }, 2000);
    if (uploadFail) return;
    setTimeout(()=>{
      setFileName(fileList?.[0].name);
      startProgressAnimation();
    }, 800);
  }, []);


  const startProgressAnimation = () => {
    let percent = 0;
    const step = 1;
    const TERMINAL_T = 30;
    const interval = setInterval(() => {
      if (percent >= TERMINAL_T) {
        clearInterval(interval);
        setPercent(TERMINAL_T);
        return;
      }
      percent += step;
      setPercent(percent);
    }, 50)
  };

  const inputStyle = {
    position: 'absolute',
    left: 0,
    height: '100%',
    width: '100%',
    cursor: 'pointer',
    opacity: 0,
    top: 0,
  }

  const videoStyle = {
    width: '100%',
    height: '100%',
  }

  return (
    // <div className={`rc_uploader_wrapper ${!fileName? 'rc_need_bgimg':''} ${!!zoomState? 'rc_zoom_in':''}`}>
    <div className={`rc_uploader_wrapper  ${!!zoomState? 'rc_zoom_in':''}`}>
      <div className='rc_rotate_bg'/>
      {/* {
        !!fileName? <div className='rc_rotate_bg'/>: null
      } */}
      <div
        ref={dropZoneRef} onDragOver={onDragOver} onDrop={onDrop}
        onDragLeave={onDragLeave}
        className={'rc_file_droparea'}
      >
        <div
          className={`rc_file_droparea-inner ${!!zoomState? 'rc_red_dashed_border':''}`}
        >
          {
            fileName? (
              <div
                className={`rc_upload_image rc_video_border ${!!needFlip? 'rc_flipping_video':''}`}
              >
                <video 
                  ref={videoPreviewRef} 
                  style={videoStyle} 
                  src={videoUrl}
                />
              </div>
            ):(
              <img src={uploadFileIcon} alt="" className={`rc_upload_image  ${!!needFlip? 'rc_flipping_image':''}`} />
            )
          }
          {
            !!fileName? (
              <div className={'rc_upload_title'}>
                {fileName}
              </div>
            ): (
              <div className={'rc_upload_title'}>
                Drop File Here or <span
                className={'rc_upload_title_underline'}>
                  Browse
                </span>
              </div>
            )
          }
          {
            // !!fileName? (
            //   <Progress percent={percent} setPercent={setPercent} />
            // ): 
            (
              <div className={'rc_upload_sub_title'}>
                Supports WAV, MP3, and MP4 files up to 30 minutes long
              </div>
            )
          }
          <input 
            className='file-input'
            ref={inputRef}
            style={inputStyle}
            onChange={onChange}
            name="fileInput" type="file" multiple maxLength="10" 
          />
        </div>
      </div>
    </div>
  );
};