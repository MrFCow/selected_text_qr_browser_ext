
import React, {useRef, useState} from "react";
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import QRCode from "qrcode";

import browser from "webextension-polyfill";

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 300,
  },
  canvas: {
    width: 150,
  }
});



function App() {
  const [text, setText] = useState(null);
  const classes = useStyles();
  const canvasRef = useRef(null);
  
  function handleClickSelectText() {
    // const text = window.getSelection().toString();
    // QRCode.toCanvas(canvasRef.current, text);
    browser.tabs.executeScript( {
      code: "window.getSelection().toString();"
    }).then(text => {
      setText(text);
      QRCode.toCanvas(canvasRef.current, text);
    })
  }

  function handleClickGetUrl() {
    // const text = window.location.href.toString();
    // QRCode.toCanvas(canvasRef.current, text);
    browser.tabs.executeScript( {
      code: "window.location.href.toString();"
    }).then(text => {
      setText(text);
      QRCode.toCanvas(canvasRef.current, text);
    })
  }

  return (
    <div className={classes.root}>
      <div>
        <Button variant="outlined" onClick={handleClickGetUrl}>Get URL</Button>
        <Button variant="outlined" onClick={handleClickSelectText}>Get Selected Text</Button>
      </div>
      <div>
        <canvas ref={canvasRef} className={classes.canvas}/>
        <div>{text}</div>
      </div>
    </div>
  );
}

export default App;
