import $api from "../api/index.ts"
import { AxiosResponse } from 'axios'
import { ChartsResponse } from "../models/response/ChartsResponse.ts"

export default class UserService {
    static async getCharts(): Promise<AxiosResponse<ChartsResponse>> {
        return $api.get('api/charts/')
        .then(response => response)
    }

    
}

