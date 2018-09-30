import axios from 'axios';

import { GET_PROFILE, 
        PROFILE_LOADING, 
        //GET_ERRORS, 
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