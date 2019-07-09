import React, { Component } from 'react';
import Axios from 'axios';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { withRouter } from 'react-router';

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
    Axios.post(`/api/user/?name=${this.state.name}&phoneNo=${this.state.phoneNo}&email=${this.state.email}&companyId=${companyId}&promotionId=${promotionId}`)
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
    console.log(this.state.phoneNo);
    return (
      <div className = "landing">
        <h1 className="headingTop"><font color="white">{this.state.title}</font></h1>
        <h3><font color="white">{this.state.description}</font></h3>
            <div className="landingContainer">
                <img className="promoImg" src={this.state.imageurl} />
                <form className="landingForm promoInput" onSubmit= {this.onSubmit}>
                    <font color="white"><p>SUBSCRIBE & GET YOUR PROMO</p></font>
                    <font color="#ccc"><p>Don't miss this great opportunity. Get it Now!</p></font>
                    <input type="text" name="name" className= "formInput" placeholder="Name" value= {this.state.name} onChange= {this.onChange} />
                    <div className="clear"></div>

                    <input type="email" name="email" className= "formInput" placeholder="Email" value= {this.state.email} onChange= {this.onChange} />
                    <div className="clear"></div>
                    <br />
                    <PhoneInput
                    className= "phoneNumber"
                    placeholder="Enter phone number"
                    value={ this.state.phoneNo }
                    onChange={ phoneNo => this.setState({ phoneNo }) } />
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