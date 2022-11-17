import axios from 'axios';

const location = async ({address, city, country}) =>{
    console.log(address, city, country)
    const urlApi = `https://api.mymappi.com/v2/geocoding/direct?apikey=${process.env.REACT_APP_MAPPI_KEY}&q=${address}, ${city}, ${country}&layers=address`;
    const data= await axios.get(urlApi);
    const dataPosta = data.data.data.filter(location => location.region === city);
    const response = dataPosta.length? dataPosta[0]: {lat: null, lon: null}
    return response;
}

export default location;