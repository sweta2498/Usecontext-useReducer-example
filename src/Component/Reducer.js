import { ActionType } from "../Action_Type";

export function GetPostReducer(state, action) {
    switch (action.type) {
        case ActionType.SET_GETPOST:
            return action.payload

        case ActionType.SET_NEW_POST:
            const result = action.payload;
            let setpost = state;
            return [...setpost, result]

        case ActionType.EDIT_POST:
            console.log(action.payload);
            let ppost = state;
            const pindex = ppost.findIndex(c => c.id === action.payload.pid);
            ppost[pindex] = action.payload.result;
            return [...ppost]

        case ActionType.SET_LIKE:
            console.log(action.payload);
            let post = action.payload.postdata
            const index = post.findIndex(c => c.id === action.payload.id);
            post[index] = action.payload.result;
            return [...post]

        default:
            return [...state]
    }
}

export function SetCommentReducer(state = [], action) {

    switch (action.type) {
        case ActionType.ALL_COMMENT:
            return action.payload

        case ActionType.SET_COMMENT:
            const result = action.payload;
            let setcmt = state;
            return [...setcmt, result]

        case ActionType.EDIT_COMMENT:
            let cpost = state;
            const index = cpost.findIndex(c => c.id === action.payload.id);
            cpost[index] = action.payload.result;
            return [...cpost]

        case ActionType.SET_DELETE_COMMENT:
            console.log(action.payload);
            let dcmt = state;
            dcmt = dcmt.filter((item) => item.id !== action.payload)
            // console.log(dcmt);
            return [...dcmt]

        default:
            return state;
    }
}


// export function SetLikeReducer(state, action) {
//     switch (action.type) {
//         case ActionType.SET_LIKE:
//             console.log(action.payload);
//             let post = action.payload.postdata
//             const index = post.findIndex(c => c.id === action.payload.id);
//             post[index] = action.payload.result;
//             return [...post]
//         default:
//             return [...state]
//     }
// }