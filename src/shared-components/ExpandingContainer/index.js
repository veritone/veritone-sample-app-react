import React from "react";

import styles from "./styles/index.scss";

import { PropTypes } from "helpers/react";
const { node, children, bool, shape, any } = PropTypes;

export default class ExpandingContainer extends React.Component {
  static propTypes = {
    title: node,
    expandedTitle: node,
    defaultExpanded: bool,
    style: shape(any),
    children
  };
  static defaultProps = {
    defaultExpanded: false
  };

  state = {
    open: this.props.defaultExpanded
  };

  componentWillUpdate(nextProps) {
    if (nextProps.defaultExpanded !== this.props.defaultExpanded) {
      this.setState({
        open: nextProps.defaultExpanded
      });
    }
  }

  toggleState = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <div
        className={styles["container"]}
        style={this.state.open ? this.props.style : null}
      >
        <div className={styles["title"]}>
          <div className={styles["title-content"]}>
            {this.state.open ? this.props.expandedTitle : this.props.title}
          </div>
        </div>
        {this.state.open && this.props.children}
      </div>
    );
  }
}
