import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class EditKeynote extends React.Component {
  constructor(props) {
    super(props);
    const { id, title, description, speaker, startDate, startTime, endTime } =
      props.location.state.keynote;
    this.state = {
      id,
      title,
      description,
      speaker,
      startDate,
      startTime,
      endTime,
    };
  }
  update = (e) => {
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
    this.props.updateKeynoteHandler(this.state);
    this.setState({
      title: "",
      description: "",
      speaker: "",
      startDate: "",
      startTime:"",
      endTime: "",
    });
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="ui main">
        <h2>Edit keynote</h2>
        <form className="ui form" onSubmit={this.update}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              title="title"
              placeholder="title"
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Description</label>
            <CKEditor
              editor={ClassicEditor}
              data={this.state.description}
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
              title="speaker"
              placeholder="speaker"
              value={this.state.speaker}
              onChange={(e) => this.setState({ speaker: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Start Date</label>
            <input
              type="date"
              title="startDate"
              placeholder="startDate"
              value={this.state.startDate}
              onChange={(e) => this.setState({ startDate: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Start time</label>
            <input
              type="time"
              title="startTime"
              placeholder="startTime"
              value={this.state.startTime}
              onChange={(e) => this.setState({ startTime: e.target.value })}
            />
          </div>
          <div className="field">
            <label>End time</label>
            <input
              type="time"
              title="endTime"
              placeholder="endTime"
              value={this.state.endTime}
              onChange={(e) => this.setState({ endTime: e.target.value })}
            />
          </div>
          <button className="ui button blue">Update</button>
        </form>
      </div>
    );
  }
}

export default EditKeynote;
