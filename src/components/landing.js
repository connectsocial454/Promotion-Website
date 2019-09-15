import React, { Component } from 'react';
import Axios from 'axios';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { withRouter } from 'react-router';

import ReactTooltip from 'react-tooltip';

class Landing extends Component {
  constructor(props){
    super(props);
    this.state = {
      name : '',
      email: '',
      phoneNo: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.recordFan = this.recordFan.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value })
  }

  onSubmit(e){
    e.preventDefault();
    // const companyName = this.props.match.params.companyName;
    const companyId = this.props.match.params.companyId;
    const promotionId = this.props.match.params.promotionId;
    Axios.post(`/api/user/?firstName=${this.state.firstName}&lastName=${this.state.lastName}&phoneNo=${this.state.phoneNo}&email=${this.state.email}&companyId=${companyId}&promotionId=${promotionId}`)
    .then(alert("Promo Code Sent!"));
    this.recordFan();
    this.props.history.push(`/confirmPromo/${companyId}/${promotionId}/${this.state.email}/${this.state.phoneNo}`);
  }
  componentDidMount(){
    const promotionId = this.props.match.params.promotionId;
    Axios.get(`http://18.194.15.56:5000/api/client/promotion/getPromotion?promotionId=${promotionId}`)
    .then(res =>{
      console.log(res.data)
      this.setState({data: res.data, title: res.data.title, description: res.data.description, imageurl: res.data.imageurl})
    })
  }
  recordFan(){
    Axios.post(`http://18.194.15.56:5000/api/user/totalFans?companyId=${this.props.match.params.companyId}`)
    .then(console.log("Thank you for signing up!"));
  }
  render() {
    const data = this.state.title;
    const imageurl = "/uploads/" + this.state.imageurl;
    return (
      <div className = "landing">
        <h1 className="headingTop"><font color="white">{this.state.title}</font></h1>
        <h3><font color="white">{this.state.description}</font></h3>
            <div className="landingContainer">
                <img className="promoImg" src={imageurl} />
                <form className="landingForm promoInput" onSubmit= {this.onSubmit}>
                    <font color="white"><p>SUBSCRIBE & GET YOUR PROMO</p></font>
                    <font color="#ccc"><p>Don't miss this great opportunity. Get it Now!</p></font>
                    <input type="text" name="firstName" className= "formInput" placeholder="First Name" value= {this.state.firstName} onChange= {this.onChange} />
                    <div className="clear"></div>

                    <input type="text" name="lastName" className= "formInput" placeholder="Last Name" value= {this.state.lastName} onChange= {this.onChange} />
                    <div className="clear"></div>

                    <input type="email" name="email" className= "formInput" placeholder="Email" value= {this.state.email} onChange= {this.onChange} />
                    <div className="clear"></div>
                    <br />
                    <PhoneInput
                    className= "phoneNumber"
                    placeholder="Enter phone number"
                    value={ this.state.phoneNo }
                    country = "US"
                    countries = {["US"]}
                    onChange={ phoneNo => this.setState({ phoneNo }) } />
                    <div className="btnTooltip" data-tip="To receive this great offer right on your mobile phone please enter your name, email and mobile number.  Once you hit submit, you’ll receive a text message with a code.  Click on close on the website and enter the code where it says Promo Code and hit submit.  You’ll then receive an email with your Connect Exclusive Offer.  Simply take that offer and show it to the Merchant to get the Offer.  Thank you and Enjoy!
">?</div>
                    <ReactTooltip className="tooltip" />
                    <div className="clear"></div>
                    <br />
                    <button className="btnSubmit">Submit</button>
                </form>
            </div>
      </div>
    )
  }
}

export default Landing;