import {observer} from 'mobx-react-lite'


function Page404() {
    return (
        <div className='page__404'>
            <div className='text-center'>
                <h2><span>Error: 404</span></h2>
                <h2>Page not found :(</h2>
            </div>
        </div>
    )
}

export default observer(Page404);