import {createStore, combineReducers} from "redux";
import script from "js/common";

let store = createStore(combineReducers({
    inputFile,
    layout,
    loginData,
    product,
    company,
    followUser,
    popup,
}));

function inputFile(state = {}, action) {
    if (action.type === 'inputFile/setFile') {
        console.log("inputFile/setFile action : ", action);
        console.log("inputFile/setFile action.payload : ", action.payload);
        state = action.payload;
        console.log("inputFile/setFile ...action.payload : ", action.payload);
    }
    return state;
}

function layout(state = {}, action) {
    if (action.type === 'layout/set') {
        state = {...action.payload};
    }
    return state;
}

function loginData(state = {}, action) {
    if (action.type === 'loginData/set') {
        state = {...action.payload};
    } else if (action.type === 'loginData/get') {
        script.callAxios('get', {
            url: `/member`,
            result: (result) => {
                store.dispatch({type: 'loginData/set', payload: {...result.data}});
            },
            err: (err) => {
                console.log("loginData/get err : ", err)
            }
        });
    }
    return state;
}

function product(state = {list: []}, action) {
    if (action.type === 'product/set') {
        state = {...action.payload};
    } else if (action.type === 'product/listGet') {
        script.callAxios('get', {
            url: `/vddm/product/list?start=${state.list.length}&length=20`,
            result: (result) => {
                state = {...state}
                state.list = [...state.list, ...result.data];
                store.dispatch({type: 'product/set', payload: {...state}});
            },
            err: (err) => {
                console.log("product/listGet err : ", err)
            }
        });
    }
    return state;
}

function company(state = {list: [], demandLength: 20, loadListLength: 0, callLength: 0, callFollow: true}, action) {
    if (action.type === 'company/set') {
        state = {...action.payload};
    } else if (action.type === 'company/listGet') {
        state = {...state};
        if (state.callFollow) {
            state.callLength = state.demandLength;
            script.callAxios('get', {
                url: `/vddm/following/list?start=${state.list.length}&length=${state.callLength}`,
                result: (result) => {
                    state = {...state};
                    state.loadListLength = state.list.length + state.demandLength;
                    state.list = [...state.list, ...result.data];
                    if (state.list.length !== state.loadListLength) {
                        state.callFollow = false;
                        state.callLength = state.loadListLength - state.list.length;
                    }
                    store.dispatch({type: 'company/set', payload: state});
                    store.dispatch({type: 'company/listGet', payload: state});
                },
                err: (err) => {
                    console.log("company/listGet err : ", err)
                }
            });
        } else {
            script.callAxios('get', {
                url: `/vddm/list?start=${state.list.length}&length=${state.callLength}`,
                result: (result) => {
                    state = {...state};
                    state.loadListLength = state.list.length + state.demandLength;
                    state.list = [...state.list, ...result.data];
                    if (state.callLength !== state.demandLength) {
                        state.callLength = state.demandLength;
                    }
                    store.dispatch({type: 'company/set', payload: state});
                },
                err: (err) => {
                    console.log("company/listGet err : ", err)
                }
            });
        }
    } else if (action.type === 'company/follow') {
        state = {...state};
        let followYn = '';
        if (state.list[action.payload].following_yn == "N") {
            followYn = "Y";
        } else {
            followYn = "N";
        }
        // 확인용 코드
        state.list[action.payload].following_yn = followYn;
    }
    return state;
}

function followUser(state = false, action) {
    if (action.type === 'followUser/set') {
        state = action.payload;
    } else if (action.type === 'followUser/follow') {
        script.callAxios('post', {
            url: `/vddm/following?wholesale_client_id=${action.payload}`,
            result: (result) => {
                store.dispatch({type: 'followUser/set', payload: true});
            },
            err: (err) => {
                console.log("followUser/follow err : ", err);
                script.callAxios('delete', {
                    url: `/vddm/unfollowing/${action.payload}`,
                    result: (result) => {
                        store.dispatch({type: 'followUser/set', payload: false});
                    },
                    err: (err) => {
                        console.log("followUser/unFollow err : ", err);
                    }
                });
            }
        });
    } else if (action.type === 'followUser/unFollow') {
        script.callAxios('delete', {
            url: `/vddm/unfollowing/${action.payload}`,
            result: (result) => {
                store.dispatch({type: 'followUser/set', payload: false});
            },
            err: (err) => {
                console.log("followUser/unFollow err : ", err);
            }
        });
    }
    return state;
}

function popup(state = [], action) {
    if (action.type === 'popup/set') {
        state = {...action.payload};
    } else if (action.type === 'popup/close') {
        if (!action.payload || (action.payload && action.payload.target.classList.contains('dim'))) {
            state = {};
        }
    }
    return state;
};

export default store;