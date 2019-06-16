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

    componentDidMount(){
        const email = this.props.match.params.email;
        const promotionId = this.props.match.params.promotionId;
        Axios.get(`/api/user/promoEmail?promotionId=${promotionId}&toEmail=${email}&fromEmail=`);
    }
  
  render() {
    const email = this.props.match.params.email;
    let url = `localhost:3000/campaign/promo/email/${email}`
    return (
        <div className = "landingEmailPage">
          <h1 className="headingTop"><font color="white">La Bella Napoli Pizzeria want a Cold Beer</font></h1>
          <h3><font color="white">Get a Cold Beer at La Bella Napoli Pizzeria</font></h3>
          <div className="landingEmailContainer">
            <img className="promoEmailImg" src="https://www.bandt.com.au/information/uploads/2016/07/Quarterpoundmyangus-1260x840.jpg" />
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