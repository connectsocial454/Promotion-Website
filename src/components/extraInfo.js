import React, { Component } from 'react';
import Axios from 'axios';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { withRouter } from 'react-router';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class ExtraInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      zipCode : '',
      dob: '',
      gender: '',
      dob: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
  }

  handleStartDate(date) {
    this.setState({
      dob: date
    })
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value })
  }

  onSubmit(e){
    e.preventDefault();
    // const companyId = this.props.match.params.companyId;
    const promotionId = this.props.match.params.promotionId;
    const email = this.props.match.params.email;

    const age = Math.floor((new Date() - new Date(this.state.dob).getTime()) / 3.15576e+10);

    Axios.post(`http://3.121.98.124:5000/api/user/extraInfo?zipCode=${this.state.zipCode}&dob=${this.state.dob}&gender=${this.state.gender}&promotionId=${promotionId}&age=${age}`)
    .then(alert("Thank You for the details!"));
    this.props.history.push(`/promo/${promotionId}/email/${email}`);
  }
  componentDidMount(){
    const promotionId = this.props.match.params.promotionId;
    Axios.get(`http://3.121.98.124:5000/api/client/promotion/getPromotion?promotionId=${promotionId}`)
    .then(res =>{
      console.log(res.data)
      this.setState({data: res.data, title: res.data.title, description: res.data.description, imageurl: res.data.imageurl})
    })
  }
  render() {
    const data = this.state.title;
    console.log(this.state.dob)
    console.log(data);
    return (
      <div className = "landing">
        <h1 className="headingTop"><font color="white">{this.state.title}</font></h1>
        <h3><font color="white">{this.state.description}</font></h3>
            <div className="landingContainer">
                <img className="promoImg" src={this.state.imageurl} />
                <form className="landingForm promoInput" onSubmit= {this.onSubmit}>
                    <font color="white"><p>SUBSCRIBE & GET YOUR PROMO</p></font>
                    <font color="#ccc"><p>Don't miss this great opportunity. Get it Now!</p></font>
                    <input type="text" name="zipCode" className= "formInput" placeholder="Zip Code" value= {this.state.name} onChange= {this.onChange} />
                    <div className="clear"></div>

                    <DatePicker
                            openToDate={new Date()}
                            className = "formInput"
                            selected={this.state.dob}
                            dateFormat="yyyy-MM-dd"
                            onChange={this.handleStartDate}
                            placeholderText = "Date of Birth"
                    />
                    <div className="clear"></div>
                    
                    <select className="formInput" name="gender" onChange = {this.onChange}>
                        <option value = "Male">Male</option>
                        <option value = "Female">Female</option>
                    </select>
                    <div className="clear"></div>
                    <br />
                    <button className="btnSubmit">Submit</button>
                </form>
            </div>
      </div>
    )
  }
}

export default ExtraInfo;