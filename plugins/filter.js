import Vue from 'vue'
import dayjs from 'dayjs';

export default function () {
    Vue.filter('date', function (value, format = "YYYY-MM-DD HH:mm:ss") {
        if (!value) return '';
        return dayjs(value).format(format);
    })
}  