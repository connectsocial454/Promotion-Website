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

class PromoEmail extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
    // this.onSubmit = this.onSubmit.bind(this);
    // this.onChange = this.onChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  componentDidMount(){
    const promotionId = this.props.match.params.promotionId;
    Axios.get(`http://18.194.15.56:5000/api/client/promotion/getPromotion?promotionId=${promotionId}`)
    .then(res =>{
      console.log(res.data)
      this.setState({data: res.data, title: res.data.title, description: res.data.description, imageurl: res.data.imageurl})
    })
    this.sendEmail();
  }

  sendEmail(){
    const promotionId = this.props.match.params.promotionId;
    const toEmail = this.props.match.params.email;
    Axios.get(`http://18.194.15.56:5000/api/user/promoEmail?promotionId=${promotionId}&toEmail=${toEmail}`)
    .then(res=>{
      res.json("Posted")
    })
  }
  
  render() {
    const email = this.props.match.params.email;
    const imageurl = "/uploads/" + this.state.imageurl;
    let url = `18.194.15.56:3000/campaign/promo/email/${email}`
    return (
        <div className = "landingEmailPage">
          <h1 className="headingTop"><font color="white">{this.state.title}</font></h1>
          <h3><font color="white">{this.state.description}</font></h3>
          <div className="landingEmailContainer">
            <img className="promoEmailImg" src={imageurl} />
            <div className="emailForm">
            <p className= "EmailText">Please check your email for your download link!</p>

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

export default PromoEmail;