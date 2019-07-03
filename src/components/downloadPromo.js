import React, { Component } from 'react';
import Axios from 'axios';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  EmailShareButton,
} from 'react-share';

import {
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
  PinterestIcon,
  EmailIcon,
} from 'react-share';

class DownloadPromo extends Component {

  // componentDidMount(){
  //   const promotionId = this.props.match.params.promotionId;
  //   Axios.get(`http://localhost:5000/api/client/promotion/getPromotion?promotionId=${promotionId}`)
  //   .then(res =>{
  //     console.log(res.data)
  //     this.setState({data: res.data, title: res.data.title, description: res.data.description, imageurl: res.data.imageurl})
  //   })
  // }
  
  render() {
    let url = `3.121.98.124:3000/getPromo`
    return (
        <div className = "landing">
          <h1 className="headingTop"><font color="white">Promotion</font></h1>
          <h3><font color="white">Promotion Description</font></h3>
        <div className="landingEmailContainer">
            
            <img className="promoEmailImg" src="https://d16jhsvmsopai9.cloudfront.net/upload/img/sg-shiokaaah_promothumbnail-r2.jpg" />
            <div className="emailForm">
            <p className= "EmailText">Download your promo!</p>

            <h3><font color="white">Share this Promotion</font></h3>
            <div className="floatLeft">
          <FacebookShareButton url={url} >
          <FacebookIcon size={28} round={true} />
          </FacebookShareButton>
          </div>
          <div className="floatLeft">
          <TwitterShareButton url={url} >
          <TwitterIcon size={28} round={true} />
          </TwitterShareButton>
          </div>
          <div className="floatLeft">
          <LinkedinShareButton url={url} >
          <LinkedinIcon size={28} round={true} />
          </LinkedinShareButton>
          </div>
            </div>
        </div>
  </div>
    )
  }
}

export default DownloadPromo;