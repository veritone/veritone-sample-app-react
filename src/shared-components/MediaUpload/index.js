import React, { Component, Fragment } from 'react';
import { func } from 'prop-types';
import Button from 'material-ui/Button';

import styles from './styles/index.css';

export default class MediaUploadButton extends Component {
  static propTypes = {
    onFileLoad: func.isRequired
  };

  handleInputChange = e => {
    const file = e.target.files[0];
    // Files is a list because you can select several files
    // We just upload the first selected file
    const reader = new FileReader();

    // We read the file and call the upload function with the result
    reader.onload = evt => {
      let video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = (e) => {
        window.URL.revokeObjectURL(e.target.src);
        const startDateTime = file.lastModified;
        const duration = Math.round(video.duration);
        const stopDateTime = startDateTime + duration * 1000;

        file.startDateTime = startDateTime;
        file.stopDateTime = stopDateTime;
        file.duration = duration;

        return this.props.onFileLoad(evt, file);
      };

      video.src = URL.createObjectURL(file);
    };

    reader.readAsArrayBuffer(file);
  };

  render() {
    return (
      <Fragment>
        <input
          className={styles.fileInput}
          type="file"
          id="file"
          accept="video/*	"
          onChange={this.handleInputChange}
        />
        <label htmlFor="file">
          <Button color="primary" raised component="span">
            Upload
          </Button>
        </label>
      </Fragment>
    );
  }
}
