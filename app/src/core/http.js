import axios from 'axios';
import { Notify } from 'vant';

if (process.env.NODE_ENV == 'development') {//开发环境
    axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'production') {//生产环境
    axios.defaults.baseURL = 'http://www.prhljt.com:5013/';
}


const http = {
    request(config) {
        let { url, method, data } = config;
        return new Promise((resolve) => {
            axios({
                url: url,
                method: method || 'post',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                },
                // success(res) {
                //     res = res.data;
                //     if (res.code === 0) {
                //         resolve(res);
                //     } else {
                //         Notify({
                //             type: "danger",
                //             message: res.msg
                //         })
                //     }
                //     resolve(res)
                // },
                // fail(err) {
                //     // alert(JSON.stringify(res))
                //     Notify({
                //         type: "danger",
                //         message: err.msg
                //     })
                // }
            }).then((res) => {
                res = res.data;
                if (res.code === 0) {
                    resolve(res);
                } else {
                    Notify({
                        type: "danger",
                        message: res.msg
                    })
                }
            })
        }).catch(err => {
            Notify({
                type: 'danger',
                message: JSON.stringify(err)
            })
        });
    }
}

export default http;