import React from 'react';
import {Checkbox, Row, Col, FormGroup, FormControl, Button} from 'react-bootstrap';

let choices = [];

class Checkboxes extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox(value) {
    console.log(value);
  }

  handleFormSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    for (const checkbox of this.selectedCheckboxes) {
        choices.push(checkbox.key);
      }
    this.props.getTopStories(choices);
  }

  createCheckbox(source) {
    console.log('Making checkboxes!');
    return (
      <Checkbox inline key={source.id} label={source.name} handleCheckboxChange={this.toggleCheckbox} />
      );
  }

  createCheckboxes() {
    this.props.sources.map(this.createCheckbox);
  }

  render() {
    return (
      <div className="checkboxContainer">
        <Row>
          <Col md={12}>
            <FormGroup onSubmit={this.handleFormSubmit}>
                {this.props.sources.map((source) => (
                      <div className="checkbox" key={source.id}>
                          <label>
                          <input type="checkbox" value={source.id} onChange={this.toggleCheckbox()}/>
                          <span className="cr"><i className="cr-icon glyphicon glyphicon-ok"></i></span>
                            {source.name}
                          </label>
                      </div>
                  ))}
                <Button bsStyle='primary' type="submit">Get the Top Stories</Button>
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }

}

export default Checkboxes;