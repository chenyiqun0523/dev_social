import axios from 'axios';

import { GET_PROFILE, 
        PROFILE_LOADING, 
        GET_ERRORS, 
        SET_CURRENT_USER,
        CLEAR_CURRENT_PROFILE } from './types';

// Get current profile

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());  //set loading to true
    axios.get('/api/profile')
        .then(res => 
           dispatch({
               type: GET_PROFILE,
               payload: res.data
           })
        )
        .catch(err =>    //if there is an error, it means there is no profile for this user, which is ok
                        // just return an empty payload
          dispatch({
              type: GET_PROFILE,
              payload: {}
          })  
        );
};


// Create Profile
export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch ({
                type: GET_ERRORS,
                payload: err.response.data
            })  
        );
}

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

// Add experience
export const addExperience = (expData, history) => dispatch => {
    axios
        .post('/api/profile/experience', expData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Delete account & profile
export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')) {
        axios
            .delete('/api/profile')
            .then(res => 
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
            )
            .catch(err => 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );

    }
}