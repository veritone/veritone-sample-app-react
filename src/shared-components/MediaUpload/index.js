// *-* mode: rjsx -*-
import React, {Component} from 'react';
import propTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import {filter, assign} from 'lodash';

import styles from './styles/index.css';


export default class MediaUpload extends Component {

    static defaultProps = {
        onFileLoad: (e) => undefined,
        files: []
    };

    static propTypes = {
        onFileLoad: propTypes.func,
        files: propTypes.array
    };

    onInputChange = (e) => {
        filter(
            e.target.files,
            (file) => file.type.match(this.props.fileTypeRegex) !== null
        )
        .forEach(
            (file) => {
                const self = this;
                // Files is a list because you can select several files
                // We just upload the first selected file
                const reader = new FileReader();

                // We read the file and call the upload function with the result
                reader.onload = (evt) => {
                    self.props.files.push(file);
                    const video = document.createElement('video');
                    video.preload = 'metadata';
                    
                    video.onloadedmetadata = function() {
                        window.URL.revokeObjectURL(this.src)
                        const startDateTime = file.lastModified;
                        const duration = Math.round(video.duration);
                        const stopDateTime = startDateTime + (duration * 1000);

                        self.props.files[self.props.files.length-1].startDateTime = startDateTime;
                        self.props.files[self.props.files.length-1].stopDateTime = stopDateTime;
                        self.props.files[self.props.files.length-1].duration = duration;

                        return self.props.onFileLoad(evt, self.props.files[0]);
                    }

                    video.src = URL.createObjectURL(file);
                }

                reader.readAsArrayBuffer(file);                      
            }
        );
    };

    componentDidMount() {
        findDOMNode(this.refs['file-input'])
            .addEventListener(
                'change',
                this.onInputChange,
                false
            );
    };

    componentWillUnmount() {
        findDOMNode(this.refs['file-input'])
            .removeEventListener(
                'change',
                this.onInputChange,
                false
            );
    };

    render() {
        return (
            <RaisedButton
                backgroundColor='#2196f3'
                buttonStyle={{ minWidth:'110px' }}
                labelStyle={{ color: '#fff', textTransform:'capitalize' }}
                containerElement='label'
                label='Upload'>
                <input
                    className='FileInput'
                    type="file"
                    ref="file-input"
                />
            </RaisedButton>
        );
    };

}