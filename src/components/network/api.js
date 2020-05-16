import axios from './request'

export function Demo() {
    return axios.get('/demo')
}

export function Navdata() {
    return axios.get('/nav')
}

export function Typedata(pid) {
    return axios.get('/type?pid=' + pid)
}

export function Homedetail(id) {
    return axios.get('/homeDetail?id=' + id)
}

export function Typedetail(id) {
    return axios.get('/typeDetail?id=' + id)
}

export function cartData(num, img, shopname, price) {
    return axios.post('/cart', {
        num,
        img,
        shopname,
        price,

    })
}

export function userInfo(username, password, email, tel) {
    return axios.post('/register', {
        username,
        password,
        email,
        tel
    })
}

export function Login(username,password){
    return axios.post('/login',{
        username,
        password,
    })
}

export function Code(){
    return axios.get('/code')
}

export function searchData() {
    return axios.get('/search')
}

export function Forget(tel) {
    return axios.get('/sendmsg?tel=' + tel)
}

export function Findtel(tel){
    return axios.post('/findtel',{
        tel,
    })
}

export function Newpassword(tel,newpass){
    return axios.post('/newpass',{
        tel,
        newpass,
    })
}