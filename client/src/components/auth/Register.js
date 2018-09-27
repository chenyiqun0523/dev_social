import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {    //component level local storage state
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);  //bind onChange method to this.onChange
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange(e) {    //definition of onChange function: update state with input value
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {    
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    //Redux Action
    this.props.registerUser(newUser, this.props.history);


  }


  render() {
    const errors = this.state.errors;

    return (
      <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">
              Create your DevConnector account
            </p>
            <form noValidate onSubmit ={this.onSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.name     //have a is-invalid bootstrap class only if there is a name error
                  })}
                  placeholder="Name" 
                  name="name"
                  value={this.state.name} 
                  onChange={this.onChange}   //call onChange method to display typing input
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.email     //have a is-invalid bootstrap class only if there is a name error
                  })}
                  placeholder="Email Address" 
                  name="email" 
                  value={this.state.email} 
                  onChange={this.onChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
                <small className="form-text text-muted">
                  This site uses Gravatar so if you want a profile image, use a Gravatar email
                </small>
              </div>
              <div className="form-group">
                <input 
                  type="password" 
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password     //have a is-invalid bootstrap class only if there is a name error
                  })}
                  placeholder="Password" 
                  name="password" 
                  value={this.state.password} 
                  onChange={this.onChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <input 
                  type="password" 
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password2     //have a is-invalid bootstrap class only if there is a name error
                  })} 
                  placeholder="Confirm Password" 
                  name="password2" 
                  value={this.state.password2} 
                  onChange={this.onChange}
                />
                {errors.password2 && (
                  <div className="invalid-feedback">{errors.password2}</div>
                )}
              </div>
              <input 
                type="submit" 
                className="btn btn-info btn-block mt-4" 
              />
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};



//In order to get state into component, they have to be convert to props
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
//Using withRouter here. Once user finish register, re-route to login 
