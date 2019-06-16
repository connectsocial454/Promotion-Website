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
    this.props.history.push(`/confirmPromo/${companyId}/${promotionId}/${this.state.email}/${this.state.phoneNo}`);
  }
  componentDidMount(){
    const companyId = this.props.match.params.companyId;
    const promotionId = this.props.match.params.promotionId;
    Axios.get(`/api/promotion/getPromotion?companyId=${companyId}&promotionId=${promotionId}`)
    .then(res =>{
      this.setState({data: res.data})
    })
  }
  render() {
    console.log(this.props.match.params.companyId);
    return (
      <div className = "landing">
        <h1 className="headingTop"><font color="white">La Bella Napoli Pizzeria want a Cold Beer</font></h1>
        <h3><font color="white">Get a Cold Beer at La Bella Napoli Pizzeria</font></h3>
            <div className="landingContainer">
                <img className="promoImg" src="https://www.bandt.com.au/information/uploads/2016/07/Quarterpoundmyangus-1260x840.jpg" />
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