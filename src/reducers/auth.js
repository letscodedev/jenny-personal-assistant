export const SIGN_IN = () => {
    return  {
        type: 'SIGN_IN'
    }
}

export const SIGN_OUT = () => {
    return  {
        type: 'SIGN_OUT'
    }
}

const AUTH = (state = false, action) => {
    switch(action.type) {
        case 'SIGN_IN': 
            return true
        case 'SIGN_OUT':
            return false
        default:
            return state
    }
}

export default AUTH;