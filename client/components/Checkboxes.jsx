import React from 'react';
import {Checkbox, Row, Col, FormGroup, FormControl, Button} from 'react-bootstrap';

const sources = [
  {id: "associated-press", name: 'Associated Press'},
  {id: 'bbc-news', name: 'BBC News'},
  {id: 'business-insider', name: 'Business Insider'},
  {id: 'cnn', name: 'CNN'},
  {id: 'daily-mail', name: 'Daily Mail'},
  {id: 'the-economist', name: 'The Economist'},
  {id: 'entertainment-weekly', name: 'Entertainment Weekly'},
  {id: 'espn', name: 'ESPN'},
  {id: 'hacker-news', name: 'Hacker News'},
  {id: 'new-scientist', name: "New Scientist"},
  {id: 'new-york-magazine', name: 'New York Magazine'},
  {id: 'the-new-york-times', name: 'The New York Times'},
  {id: 'recode', name: 'Recode'},
  {id: 'techcrunch', name: 'TechCrunch'},
  {id: 'time', name: 'Time'},
  {id: 'the-washington-post', name: 'The Washington Post'},
  {id: 'usa-today', name: 'Time'}
];

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
    sources.map(this.createCheckbox);
  }

  render() {
    return (
      <div className="checkboxContainer">
        <Row>
          <Col md={12}>
            <FormGroup onSubmit={this.handleFormSubmit}>
                {sources.map((source) => (
                      <div className="checkbox" key={source.id}>
                          <label>
                          <input type="checkbox" value={source.id} onChange={this.toggleCheckbox}/>
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