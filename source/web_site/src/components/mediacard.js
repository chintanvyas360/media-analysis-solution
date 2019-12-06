import React, { Component } from 'react';
import { API } from 'aws-amplify';
import { Card, CardBody, CardSubtitle, CardHeader, Button, CardTitle,Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';
import preview from '../img/preview.png';
import audio from '../img/audio.png';
import video from '../img/video.png';
import "../styles/mediacard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class MediaCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      media: preview
    }
    this.deleteMediaHandler = this.deleteMediaHandler.bind(this);
  }

  componentDidMount() {
    var self = this;
  }

  deleteMediaHandler(e) {
    e.preventDefault();
    console.log("delete media:" + this.props.item.media_id)
    API.del('VizonAnalysisApi', "/deletemedia", {body: {"object_id": this.props.item.media_id}})
			.then(function (data) {
        console.log(data);
      }, err =>  {
        console.log(err);
      })
  }
  // deleteMediaHandler = async (e) => {
  //   // e.preventDefault();
  //   // console.log("delete media:" + this.props.item.media_id)
  // }

  render() {
    var name = this.props.item.name;
    var result_link = ["/result", this.props.item.media_id].join('/');
    var file_type = this.props.item.file_type;
    var upload_time = this.props.item.upload_time;
    var date_time_divider_index = upload_time.indexOf('T');
    var date = upload_time.substring(0,date_time_divider_index);
    var time = upload_time.substring(date_time_divider_index+1,upload_time.length-5);

    return (
      <div>
        <Link to={result_link} className="media-card">
          <Card className="text-center p-0" body outline>
            <CardBody className="p-0">
              <Badge color="info" className="file-type-badge">{file_type}</Badge>
              <Badge color="info" className="upload-date-badge">Date: {date}</Badge>
              <Badge color="info" className="upload-time-badge">Time: {time}</Badge>
              <div style={{ "height": "200px", "display": "flex", "justifyContent": "center", "alignItems": "flex-start" }}>
                {(this.props.item.file_type === "jpg" || this.props.item.file_type === "jpeg" || this.props.item.file_type === "png") &&
                  <img alt="preview" src={this.state.media} style={{ "width": "100%", "height": "auto", "maxHeight": "200px" }} />
                }
                {(this.props.item.file_type === "wav" || this.props.item.file_type === "wave" || this.props.item.file_type === "flac" || this.props.item.file_type === "mp3") &&
                  <div style={{ "width": "100%", "height": "auto", "maxHeight": "300px" }}>
                    <img alt="preview" src={audio} style={{ "width": "100%", "height": "auto" }} />
                    <audio src={this.state.media} controls style={{ "width": "100%" }} />
                  </div>
                }
                {(this.props.item.file_type === "mp4" || this.props.item.file_type === "mov") &&
                  <video src={this.state.media} controls style={{ "width": "100%", "height": "auto", "maxHeight": "300px" }} />
                }
              </div>
              {/*<CardTitle style={{"whiteSpace":"nowrap","textOverflow": "ellipsis","overflow": "hidden"}}>{name}</CardTitle>*/}
              {/*<CardSubtitle style={{"whiteSpace":"nowrap","textOverflow": "ellipsis","overflow": "hidden"}}>{file_type}</CardSubtitle>*/}
              {/*<div className="pt-2"><Link to={result_link}><Button color="primary">View Results</Button></Link></div>*/}
            </CardBody>
            <CardHeader className="text-dark bg-white" style={{ "whiteSpace": "nowrap", "textOverflow": "ellipsis", "overflow": "hidden" }}>
              <div style={{ "display": "flex", "flexFlow": "row wrap", "alignItems": "center", "justifyContent": "center" }}>
                <div><h6>{name}</h6></div>
                <div style={{ "marginLeft": "auto" }} className="trash-container">
                  <FontAwesomeIcon icon="trash" onClick={this.deleteMediaHandler} />
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
    );
  }
}

export default withAuthenticator(MediaCard);
