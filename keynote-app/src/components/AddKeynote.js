import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class AddKeynote extends React.Component {
  state = {
    title: "",
    description: "",
    speaker: "",
    startDate: "",
    startTime: "",
    endTime: "",
  };

  add = (e) => {
    e.preventDefault();
    if (
      this.state.title === "" ||
      this.state.description === "" ||
      this.state.speaker === "" ||
      this.state.startDate === "" ||
      this.state.startTime === "" ||
      this.state.endTime === ""
    ) {
      alert("ALl the fields are mandatory!");
      return;
    }
    this.props.addKeynoteHandler(this.state);
    this.setState({
      title: "",
      description: "",
      speaker: "",
      startDate: "",
      startTime: "",
      endTime: "",
    });
    // Go back to "/" route when you add new .
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="ui main">
        <h2>Add Keynote</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="title"
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Description</label>
            <CKEditor
              editor={ClassicEditor}
              data="description..."
              onChange={(event, editor) => {
                const data = editor.getData();
                this.setState({ description: data });
              }}
            />
          </div>
          <div className="field">
            <label>Speaker</label>
            <input
              type="text"
              name="speaker"
              placeholder="spekaer"
              value={this.state.speaker}
              onChange={(e) => this.setState({ speaker: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              placeholder="startDate"
              value={this.state.startDate}
              onChange={(e) => this.setState({ startDate: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Start Time</label>
            <input
              type="time"
              name="startTime"
              placeholder="startTime"
              value={this.state.startTime}
              onChange={(e) => this.setState({ startTime: e.target.value })}
            />
          </div>
          <div className="field">
            <label>End time</label>
            <input
              type="time"
              name="endTime"
              placeholder="endTime"
              value={this.state.endTime}
              onChange={(e) => this.setState({ endTime: e.target.value })}
            />
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }
}

export default AddKeynote;
