import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange
}) => {
  return (
    <div className="form-group">
        <textarea
        className={classnames('form-control form-control-lg', {
            'is-invalid': error     //have a is-invalid bootstrap class only if there is a name error
        })}
        placeholder={placeholder}
        name={name}
        value={value} 
        onChange={onChange}
        />
        {info && <small className="form-text text-muted">{info}</small>}
        {error && (    //display error message
            <div className="invalid-feedback">{error}</div>
        )}
  </div>
  )
}

TextAreaFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}


export default TextAreaFieldGroup;