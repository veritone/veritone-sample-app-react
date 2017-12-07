import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

import './styles/index.css';

export default class MediaUpload extends Component {
  static propTypes = {
    onFileLoad: PropTypes.func.isRequired
  };

  onInputChange = e => {
    const self = this;
    const file = e.target.files[0];
    // Files is a list because you can select several files
    // We just upload the first selected file
    const reader = new FileReader();

    // We read the file and call the upload function with the result
    reader.onload = evt => {
      let video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = function() {
        window.URL.revokeObjectURL(this.src);
        const startDateTime = file.lastModified;
        const duration = Math.round(video.duration);
        const stopDateTime = startDateTime + duration * 1000;

        file.startDateTime = startDateTime;
        file.stopDateTime = stopDateTime;
        file.duration = duration;

        return self.props.onFileLoad(evt, file);
      };

      video.src = URL.createObjectURL(file);
    };

    reader.readAsArrayBuffer(file);
  };

  render() {
    return (
      <Button
        color="primary"
        raised
        containerElement="label"
        label="Upload"
        primary
      >
        <input
          className="FileInput"
          type="file"
          onChange={this.onInputChange}
        />
      </Button>

      // <input
      //   accept="image/*"
      //   className={classes.input}
      //   id="raised-button-file"
      //   multiple
      //   type="file"
      // />
      // <label htmlFor="raised-button-file">
      //   <Button raised component="span" className={classes.button}>
      //     Upload
      //   </Button>
      // </label>
    );
  }
}
