
import React, { useCallback, useRef, useState } from 'react';
import './Progress.css';

export const Progress = ({percent}) => {

  return (
      <div className="rc_progress">
          <div className="rc_progress_wrapper" >
              <div className="rc_progress_inner" style = {{width: `${percent}%`}} ></div>
          </div>
          {/* <div className="rc_progress_info" >{percent}%</div>
          <div className="rc_btns">
              <button onClick={decrease}>-</button>
              <button onClick={increase}>+</button>
          </div> */}
      </div>
  );
};