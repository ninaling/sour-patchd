import React from 'react'
import './Form.css';
const axios = require("axios");

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('recfile',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:3000/receipt", formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
              console.log("hi")
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
        if (document.getElementById("file-upload").files.length !== 0){
          document.getElementById("file-upload-label").innerHTML = "File chosen";
        }
    }

    render() {
        return (
          <div>
            <script language="Javascript">
                {function IsEmpty() {
                  if (document.getElementById("file-upload").value == null){
                    document.getElementById("file-upload-text").content = "File chosen";
                  }
                }}
            </script>
            <form id="file-form" onSubmit={this.onFormSubmit}>
                <label htmlFor="file-upload" className="file-upload-button" id="file-upload-label">
                    Choose a file</label>
                <input type="file" name="recfile" onChange={this.onChange} id="file-upload"/>
                <span id="file-upload-text"></span>
                <button type="submit" className="file-upload-button" id="file-upload-submit">Upload</button>
            </form>
          </div>
        );
    }
}

export default Form
