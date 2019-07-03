import React, { Component } from 'react';
import Axios from 'axios';

import { withRouter } from 'react-router';

class confirmPromo extends Component {
  constructor(props){
    super(props);
    this.state = {
      promo : ''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value })
  }

  onSubmit(e){
    e.preventDefault();
    const companyId = this.props.match.params.companyId;
    const promotionId = this.props.match.params.promotionId;
    const phoneNo = this.props.match.params.phoneNo;
    const email = this.props.match.params.email;

    Axios.get(`/api/user/confirmPromo?phoneNo=${phoneNo}&companyId=${companyId}&promotionId=${promotionId}&promoCode=${this.state.promo}`)
    .then(res =>{
        console.log(res.data.status);
        {(res.data.status == 200) ?
            (this.state.extraInfo == "Yes") ?
                this.props.history.push(`/extraInfo/promo/${promotionId}/email/${email}`)
                : 
                this.props.history.push(`/promo/${promotionId}/email/${email}`)
        :
        alert("Promo InCorrect");
        }
    });
  }

  componentDidMount(){
    const promotionId = this.props.match.params.promotionId;
    Axios.get(`http://3.121.98.124:5000/api/client/promotion/getPromotion?promotionId=${promotionId}`)
    .then(res =>{
      console.log(res.data)
      this.setState({data: res.data, title: res.data.title, description: res.data.description, imageurl: res.data.imageurl, extraInfo: res.data.extraInfo})
    })
  }

  render() {
    console.log(this.props.match.params.companyId);
    return (
      <div className = "landing">
        <h1 className="headingTop"><font color="white">{this.state.title}</font></h1>
        <h3><font color="white">{this.state.description}</font></h3>
            <div className="landingContainer">
                <img className="promoImg" src={this.state.imageurl} />
                <form className="landingForm promoInput" onSubmit= {this.onSubmit}>
                <font color="white"><p>SUBSCRIBE & GET YOUR PROMO</p></font>
                    <font color="#ccc"><p>Don't miss this great opportunity. Get it Now!</p></font>
                    <input type="text" name="promo" className= "formInput" placeholder="Promo Code" value= {this.state.promo} onChange= {this.onChange} />
                    <div className="clear"></div>
                    <br/>
                    <button className="btnSubmit">Submit</button>
                </form>
            </div>
      </div>
    )
  }
}

export default confirmPromo;