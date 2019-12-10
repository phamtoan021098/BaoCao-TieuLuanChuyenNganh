const initialState=[];
const user = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOWUSER':
            state=action.user
           return [...state];
        case 'ADDUSER':
            state.push(action.user)
            return [...state];
        default: return [...state];
    }
}
export default user;