import { ADD_DATA, ADD_VALUE, ADD_USER, ADD_NUM, DEC_NUM, DEL_DATA } from './mutations-type'
export default {
    [ADD_VALUE](state, payload) {
        payload.newProduct.value += payload.payload.value
    },
    [ADD_DATA](state, payload) {
        state.cartList.push(payload)
    },
    [ADD_USER](state, payload) {
        state.userList.push(payload)
    },
    [ADD_NUM](state, payload) {
        state.cartList[payload].value++
    },
    [DEC_NUM](state, payload) {
        state.cartList[payload].value--
    },
    [DEL_DATA](state, payload) {
        state.cartList.splice(payload, 1)
    }
}