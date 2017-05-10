import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class Confirm extends React.Component {
  constructor(props) {
    super(props);
  };

  render () {
    let close = () => this.props.toggleConfirm();
    let deleteClose = () => {
      this.props.deleteArticle(this.props.url);
      this.props.toggleConfirm();
    }

    let destination = this.props.user[this.props.method];

    return (
      <div style={{height: 200}}>
        <Modal
          show={this.props.showConfirm}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title">Success!</Modal.Title>
          </Modal.Header>
          {this.props.method === 'link' ?
            (<Modal.Body>Thank you for using Readcast.ly!  Right-click <a href={this.props.link}>here</a> to download your Readcast!</Modal.Body>) :
            (<Modal.Body>Congratulations!  Your Readcast has been delivered to {destination}.</Modal.Body>)
          }
          <Modal.Footer>
            {!this.props.isGuest && !this.props.topStoryMode && <Button bsStyle="danger" onClick={deleteClose}>Remove article from library</Button>}
            <Button className="modal-close" bsStyle="success" onClick={close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

};

export default Confirm;
