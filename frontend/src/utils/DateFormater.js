import moment from 'moment';
export const DateFormater=(dateString)=>{
    return moment(dateString).format('MMMM Do, YYYY');
}