import React from 'react';

import Divider from 'material-ui/Divider';
import MediaUploadState from 'shared-components/MediaUploadState';

import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { connect } from 'react-redux';


// const { element, bool, shape, string, func } = PropTypes;


class MediaUploadStates extends React.Component {
  render() {

    const states = {
        loading: <div className='spinner' />,
        success: <NavigationCheck style={iconStyles} color='green' />,
        failed: <NavigationClose style={iconStyles} color='red' />
    }

    const iconStyles = {
        margin: '0 auto'
    };

    const actions = this.props.actions;

    return (
        <div>
            {actions && Object.keys(actions).map((action, i) => (
                <div key={i}>
                    { i > 0 && <Divider />}
                    <MediaUploadState
                        action={actions[action].name}
                        icon={states[actions[action].status]}
                        isLoading={actions[action].status === 'loading'}
                    />
                </div>
            ))}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      actions: state.mediaExample.actions
    }
  }
  
  const mapDispatchToProps = {}
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MediaUploadStates)
  
