import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, objectOf, shape, string, func, any, bool } from 'prop-types';

import Divider from 'material-ui/Divider';
import MediaUpload from 'shared-components/MediaUpload';
import MediaUploadState from 'shared-components/MediaUploadState';
import MediaUploadStates from 'shared-components/MediaUploadStates';
import RequestBar from 'shared-components/RequestBar';

import styles from './styles/index.scss';

import { transcribeMedia } from 'modules/mediaExample';

class MediaExample extends React.Component {
  static propTypes = {
    transcribeMedia: func.isRequired,
    steps: arrayOf(
      shape({
        name: string
      })
    ).isRequired,
    running: bool.isRequired,
    failure: bool.isRequired,
    // failureMessage: string.isRequired,
    result: objectOf(any)
  };

  state = {
    expanded: false
  };

  handleFileLoad = (e, file) => {
    this.setState({
      expanded: true
    });

    this.props.transcribeMedia(file);
  };

  render() {
    const isSuccess = !this.props.running && !this.props.failure;

    return (
      <div>
        <h4>Transcription Example</h4>
        <RequestBar
          description="Upload a media file to begin transcription"
          expanded={this.state.expanded}
          buttonEl={<MediaUpload onFileLoad={this.handleFileLoad} />}
        >
          <Divider style={{ marginTop: 20 }} />
          <MediaUploadStates
            steps={this.props.steps}
            running={this.props.running}
            success={isSuccess}
            failure={this.props.failure}
          />
          <Divider />
          {isSuccess && <MediaUploadState name="Results" />}
          {isSuccess && (
            // fixme: <RequestBarPayload> component
            <div className={styles.requestBar__payload}>
              <pre>{JSON.stringify(this.props.result, null, 2)}</pre>
            </div>
          )}
        </RequestBar>
      </div>
    );
  }
}

export default connect(
  state => ({
    ...state.mediaExample
  }),
  { transcribeMedia }
)(MediaExample);
