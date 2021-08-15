import { axiosWithAuth } from '../helpers/axiosWithAuth';

const useColors = (fct, data) => {
    fct(data)
}

const fetchColorService = (fct) => {
    return(
    axiosWithAuth()
        .get(`http://localhost:5000/api/colors`))
        .then(resp => {
            const { data } = resp
            return(useColors(fct, data))
        })
        .catch(err => {
            return(err)}
        )
}

export default fetchColorService;