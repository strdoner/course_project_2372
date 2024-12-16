import React from 'react'
import Chart from './Chart';
import {observer} from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx/xlsx.mjs';

const Chartitem = ({chart, deleteChart}) => {
    const navigate = useNavigate();
    
    const downloadChart = () => {
        let jsonData = []
        for (let i = 0; i < chart.keys.x.length; i++) {
            jsonData.push({"X":chart.keys.x[i], "Y":chart.keys.y[i]})
        }
        let worksheet = XLSX.utils.json_to_sheet(jsonData);
        let workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, chart.title);

        XLSX.writeFile(workbook, `${chart.title}.xlsx`);
    }

    return (
        <div className='charts__item col-md-4 col-12 d-grid align-content-between'>
            <div onClick={(e) => {navigate(`/charts/${chart.id}`)}}>
                <h4>{chart.title}</h4>
                <Chart keys={chart.keys} index={chart.id} hidePoints={1}/>
            </div>

            <div className='charts__item__footer d-flex'>
                <a onClick={downloadChart} style={{padding:"0 10px"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                </svg>
                </a>
                <a className='chart__item__btn' onClick={(e) => {deleteChart(chart)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3 text-danger" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
                </a>
            </div>

        </div>
        
    )
}

export default observer(Chartitem);