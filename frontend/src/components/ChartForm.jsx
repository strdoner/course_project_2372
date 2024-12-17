import React, { useContext} from 'react'
import { useState } from 'react'
import Button from './Button'
import { Context } from '../index.js'
const ChartForm = ({formId, createChart, updateChartsList, toastHandler}) => {
    const [error, setError] = useState({title:"", range_x:"", range_y:"", keys:"", file:""})
    const [form, setForm] = useState({title:"", min_x:0, min_y:0, max_x:0, max_y:0})
    const [keys, setKeys] = useState({x_keys:[], y_keys:[]})
    const {store} = useContext(Context)
    const [isExcelLoading, setIsExcelLoading] = useState(false)



    const onChartFormSubmit = (e) => {

        e.preventDefault()
        if (form.file !== undefined) {
            let file_type = form.file.name.split(".").pop()

            if (file_type !== "xlsx" && file_type !== "xls") {
                console.log(file_type === "xlsx")
                toastHandler("FAILURE", "Failed: Unsupported file extension!")
                return
            }
            if ((form.file.size / 1024 / 1024) > 10) {
                toastHandler("FAILURE", "Failed: The file size exceeds the maximum(10MB)!")
                return
            }
            setIsExcelLoading(true)
            const response = store.postFile(form.file)
                .then((e) => {
                    const statusChecker = setInterval(() => {

                        const response = store.checkFileProgress(e.task_id)
                            .then((e) => {
                                if (e.status === "SUCCESS" || e.status === "FAILURE") {
                                    document.querySelector(`#${formId} .close`).click()
                                    setIsExcelLoading(false)

                                    toastHandler(e.status)

                                    updateChartsList();
                                    clearInterval(statusChecker)

                                }
                            })
                    }, 1000)
                })
            return
        }
        if (form.title === "") {
            setError({...error, title:"Title place can`t be empty"})
            return
        }
        if (keys.x_keys.length !== keys.y_keys.length) {
            setError({...error, keys:"The number of keys doesn't match!"})
            return
        }
        if (keys.x_keys.length === 0) {
            setError({...error, keys:"values have not been set"})
            return
        }

        let x_keys = keys.x_keys.map(Number)
        let y_keys = keys.y_keys.map(Number)

        if (x_keys.some(isNaN)) {
            setError({...error, keys:"Incorrect input in x keys"})
            return
        }
        if (y_keys.some(isNaN)) {
            setError({...error, keys:"Incorrect input in y keys"})
            return
        }
        let tempKeys = sortingKeys(x_keys, y_keys)
        if (form.min_x > form.max_x) {
            setError({...error, range_x:"min x can`t be more then max x"})
            return
        }
        if (form.min_y > form.max_y) {
            setError({...error, range_y:"min y can`t be more then max y"})
            return
        }
        const response = store.postChart(form.title, form.min_x, form.min_y, form.max_x, form.max_y, tempKeys)
        response.then((data) => {

            document.querySelector(`#${formId} .close`).click()
            createChart(data)

        })

    }

    const sortingKeys = (x_keys, y_keys) => {
        let pairs = x_keys.map((value, index) => {
            return [value, y_keys[index]];
        });

        // Сортировка по первому элементу каждой пары
        pairs.sort((a, b) => a[0] - b[0]);

        // Разделение обратно на массивы x и y
        return {x:pairs.map(pair => pair[0]), y:pairs.map(pair => pair[1])}

    }




    return (
        <>
            <form onSubmit={onChartFormSubmit} method="POST" className='chart__form'>
                <h5>Enter title</h5>
                <input
                    className={` form-control ${error.title !== "" ? "is-invalid" : ""}`}
                    value={form.title}
                    onChange={(event)=>{setForm({...form, title:event.target.value})}}
                    type="text"
                    placeholder='Enter chart name'
                />

                <div className='d-flex justify-content-around min-h'>
                    <div className=' form-floating min-h'>

                        <input
                            id='x_min'
                            className={`short__form_item form-control ${error.range_x !== "" ? "is-invalid" : ""}`}
                            value={form.keyformatx}
                            onChange={(event)=>{setForm({...form, min_x:Number(event.target.value)})}}
                            type="number"
                            step="0.01"
                            placeholder='min'
                        />
                        <label htmlFor="x_min">X min value</label>
                    </div>
                    <div className=' form-floating min-h'>

                        <input
                            id='x_max'
                            className={`short__form_item form-control ${error.range_x !== "" ? "is-invalid" : ""}`}
                            onChange={(event)=>{setForm({...form, max_x:Number(event.target.value)})}}
                            type="number"
                            step="0.01"
                            placeholder='max'
                        />
                        <label htmlFor="x_max">X max value</label>
                    </div>
                </div>
                <div className='d-flex justify-content-around min-h'>
                    <div className=' form-floating min-h'>

                        <input
                            id='y_min'
                            className={`short__form_item form-control ${error.range_y !== "" ? "is-invalid" : ""}`}
                            onChange={(event)=>{setForm({...form, min_y:Number(event.target.value)})}}
                            type="number"
                            step="0.01"
                            placeholder='min'
                        />
                        <label htmlFor="y_min">Y min value</label>

                    </div>
                    <div className=' form-floating min-h'>

                        <input
                            id='y_max'
                            className={`short__form_item form-control ${error.range_y !== "" ? "is-invalid" : ""}`}
                            onChange={(event)=>{setForm({...form, max_y:Number(event.target.value)})}}
                            type="number"
                            step="0.01"
                            placeholder='max'
                        />
                        <label htmlFor="y_max">Y max value</label>

                    </div>

                </div>

                <div className='manual_input__block d-flex justify-content-around'>

                    <div className=' form-floating min-h'>

                    <textarea
                        id='y_min'
                        className={`short__form_item form-control ${error.keys !== "" ? "is-invalid" : ""}`}
                        onChange={(event)=>{setKeys({...keys, x_keys:event.target.value.split(`\n`)})}}
                        value={keys.x_keys.join(`\n`)}
                        style={{minHeight:"300px"}}

                        placeholder='x_key'
                    />
                        <label htmlFor="x_key">Enter x keys</label>

                    </div>
                    <div className=' form-floating min-h'>

                    <textarea
                        id='y_max'
                        className={`short__form_item form-control ${error.keys !== "" ? "is-invalid" : ""}`}
                        onChange={(event)=>{setKeys({...keys, y_keys:[...event.target.value.split(`\n`)]})}}
                        value={keys.y_keys.join(`\n`)}
                        style={{minHeight:"300px"}}

                        placeholder='y_key'
                    />
                        <label htmlFor="y_key">Enter y keys</label>

                    </div>
                </div>
                <div className='form_delimiter d-flex justify-content-around align-items-center'>
                    <div className='line col-5'></div>
                    <h5>or</h5>
                    <div className='line col-5'></div>
                </div>

                <div className="input-group">
                    <input
                        className="form-control form-control-lg"
                        id="formFileLg"
                        type="file"
                        onChange={(event)=>{setForm({...form, file:event.target.files[0]})}}
                    />
                </div>
                <div className='text-danger text-center'>
                    <h6>{error.range_x}</h6>
                    <h6>{error.range_y}</h6>
                    <h6>{error.title}</h6>
                    <h6>{error.keys}</h6>
                </div>

                <Button isloading={isExcelLoading ? 1 : 0} btnType={"violet"} type="submit" onClick={e => setError({title:"", range_x:"", range_y:"", keys:""})}>Create a chart</Button>
            </form>

        </>


)

}



export default ChartForm
