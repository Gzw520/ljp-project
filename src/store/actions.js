import { ADD_DATA, ADD_VALUE, ADD_USER, ADD_NUM, DEC_NUM, DEL_DATA } from './mutations-type'
export default {
    cartData(context, payload) {
        let newProduct = context.state.cartList.find(item => item.name === payload.name)
        if (newProduct) {
            context.commit({
                type: ADD_VALUE,
                newProduct,
                payload,
            })
        } else {
            context.commit(ADD_DATA, payload)
        }
    },
    User(context, payload) {
        context.commit(ADD_USER, payload)
    },
    Addnum(context, payload) {
        context.commit(ADD_NUM, payload)
    },
    Decnum(context, payload) {
        const { value, index } = payload
        if (value == 1) {
            context.commit(DEL_DATA, index)
        } else {
            context.commit(DEC_NUM, index)
        }
    }
}