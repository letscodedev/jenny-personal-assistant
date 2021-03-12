export const SIGN_IN = (data) => {
    return  {
        type: 'SIGN_IN',
        payload: data
    }
}

export const SIGN_OUT = () => {
    return  {
        type: 'SIGN_OUT',
    }
}

const AUTH = (state = null, action) => {
    switch(action.type) {
        case 'SIGN_IN': 
            const payload = action.payload
            return {...state, payload}
        case 'SIGN_OUT':
            console.log(state)
            return null
        default:
            return state
    }
}

export default AUTH;