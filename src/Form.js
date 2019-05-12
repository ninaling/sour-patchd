import React from 'react'
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
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="recfile" onChange= {this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}

export default Form
