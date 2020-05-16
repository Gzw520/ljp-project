export default {
    cartData(state) {
        return state.cartList
    },
    cartLength(state) {
        return state.cartList.length
    },
    userInfo(state) {
        return state.userList.length
    },
    allPrice(state) {
        return state.cartList.reduce((prevPrice, nowPrice) => prevPrice + (nowPrice.price * nowPrice.value), 0)
    }
}


