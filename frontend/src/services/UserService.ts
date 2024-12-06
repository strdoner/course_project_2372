import $api from "../api/index.ts"
import { AxiosResponse } from 'axios'
import { ChartsResponse } from "../models/response/ChartsResponse.ts"

export default class UserService {
    static async getCharts(): Promise<AxiosResponse<ChartsResponse>> {
        return $api.get('api/charts/')
        .then(response => response)
    }

    static async postChart(title:string, min_x:number, min_y:number, max_x:number, max_y:number, data:object): Promise<AxiosResponse<ChartsResponse>> {
        return $api.post('api/charts/', {title:title, min_x:min_x, min_y:min_y, max_x:max_x, max_y:max_y, data:data})
        .then(response => response)
    }

    static async deleteChart(id:number) {
        return $api.delete(`api/charts/delete/${id}`)
        .then(response => response)
    }

    static async getChart(id:number) {
        return $api.get(`api/charts/${id}`)
        .then(response => response)
    }
    
    static async editChart(id:number, data:object) {
        return $api.patch(`api/charts/${id}`, {keys:data})
    }

    static async postFile(file:File) {
        return $api.post('api/charts/upload/', {file:file}, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(response => response)
    }

    static async checkFileProgress(task_id:string) {
        return $api.get(`api/status/${task_id}`)
    }
}

