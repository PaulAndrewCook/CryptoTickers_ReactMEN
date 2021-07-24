import * as api from '../api/index';
import { v4 as uuidv4 } from 'uuid';

export const createTicker = (Ticker) => async (dispatch) => {
	const ticId = uuidv4();
	Ticker = { symbol: Ticker, ticId, updating: true };
	console.log('apitickerfns createTicker called', Ticker);
	dispatch({ type: 'LOADING', payload: Ticker });
	const { data } = await api.createTicker(Ticker);
	// const newTic = Object.assign(data[0], { ticId }, { updating: false });
	const newTic = { ...data[0], ticId, updating: false };
	// const newTic = Object.assign(data, { ticId }, { updating: false });
	console.log('APItickerfns createTic returned', newTic);
	dispatch({ type: 'ADD', payload: newTic });
	// dispatch({ type: 'ADD', payload: { newTic, ticId, updating: false } });
};

export const getTickers = () => async (dispatch) => {
	console.log('apitickerfns getTicker called');
	const { data } = await api.getTickers();
	console.log('apitickerfns getTicker returned', data);
	dispatch({ type: 'GET', payload: data });
};

export const editTicker = (ticId, Ticker) => async (dispatch) => {
	const ticObj = { symbol: Ticker, id: ticId, updating: true };
	console.log('apitickerfns editTicker called: id', ticId, 'ticker', Ticker);
	dispatch({ type: 'EDIT', payload: ticObj });
	const { data } = await api.editTicker(ticId, Ticker);
	const newTic = { ...data[0], updating: false };
	console.log('editTicker returned', newTic);
	dispatch({ type: 'EDIT', payload: newTic });
};

export const deleteTicker = (id) => async (dispatch) => {
	const { data } = await api.deleteTicker(id);
	dispatch({ type: 'DELETE', payload: data });
};

//Update Tickers
export const updateTickers = (Tickers) => async (dispatch) => {
	console.log('apitickerfns updateTicker, tickers', Tickers);
	const { data } = await api.updateTickers(Tickers);
	console.log('apitickerfns getTicker returned', data);
	dispatch({ type: 'GET', payload: data });
};
