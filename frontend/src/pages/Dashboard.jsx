import {observer} from 'mobx-react-lite'
import ChartsList from '../components/ChartsList.jsx';
import Navbar from '../components/Navbar.jsx';


function Dashboard() {
    return (
        <div>
            <Navbar />
            <ChartsList />
        </div>
    )
}

export default observer(Dashboard);