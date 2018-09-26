import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames';

class Register extends Component {
  constructor() {
    super();
    this.state = {    //top level local storage state
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);  //bind onChange method to this.onChange
    this.onSubmit = this.onSubmit.bind(this);
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

    axios.post('/api/users/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}));
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

export default Register;