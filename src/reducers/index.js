import { combineReducers} from 'redux';
import MapReducer from './map-reducer';
import VoucherReducer from './voucher-reducer';

const allReducers = combineReducers({
    mapReducer: MapReducer,
    voucherReducer: VoucherReducer
})

export default allReducers;