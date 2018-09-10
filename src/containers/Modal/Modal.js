import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Modal from "../../components/Modal/Modal";
import { toggleModal } from "../../store/actions/modal";

class ModalContainer extends Component {
  render() {
    if (this.props.isVisible) {
      return (
        <Modal
          title={this.props.title}
          text={this.props.text}
          imageSrc={this.props.imageSrc}
          onPress={this.props.toggleModal}
        />
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ modal }) => ({
  isVisible: modal.isVisible,
  title: modal.title,
  text: modal.text,
  imageSrc: modal.imageSrc
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleModal }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContainer);
