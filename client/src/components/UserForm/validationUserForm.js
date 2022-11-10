import * as yup from 'yup';

const imgUrl= /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?.*(png|jpg|jpeg|gif)$/gm;
const re = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
export const userSchema = yup.object().shape({
    name: yup.string().required('Required Name'),
    email: yup.string().email('Please enter a valid Email').required('Required Email'),
    profilePic: yup.string().matches(imgUrl,'please enter a valid URL'),
   
})