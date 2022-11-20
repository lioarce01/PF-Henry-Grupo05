import * as yup from 'yup';

const re = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

export const ongSchema = yup.object().shape({
    name: yup.string().required('   Required Name'),
    description: yup.string().required('    Required Description'),
    website: yup.string().matches(re,'  Please enter a valid URL'),
    listAnimals: yup.array().min(1, ' Required Animals'),
    address: yup.string().required('    Required Address'),
    city: yup.string().required('   Required City'),
    country: yup.string().required('    Required Country'),
    goal: yup.number('  Goal must be a number').positive('   Goal must be a positive number').integer('  Goal must be a integer'),
})