import React from 'react';
import { PropTypes } from 'helpers/react';
import { connect } from 'react-redux';

import MediaUpload from 'shared-components/MediaUpload';
import MediaUploadState from 'shared-components/MediaUploadState';
import RequestBar from 'shared-components/RequestBar';
import ExpandingContainer from 'shared-components/ExpandingContainer';

import { transcribeMedia } from 'modules/mediaExample';
// import { createRecording, createMediaAsset } from 'modules/recording';
// import { createJob, getJob } from 'modules/job';


const { bool } = PropTypes;


class MediaExample extends React.Component {

  state = {
    expanded: false
  };

  onFileLoad = (e, file) => {

    this.setState({
      expanded: true
    });

    this.props.transcribeMedia(file);
  };  

  render() {
    return (
      <div>
        <h4>Transcription Example</h4>
        <RequestBar
          id={1}
          description={'Upload a media file to begin transcription'}
          expanded={this.state.expanded}
          button={<MediaUpload onFileLoad={this.onFileLoad}/>}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = { transcribeMedia }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaExample)

