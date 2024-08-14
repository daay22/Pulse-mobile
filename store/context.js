// MyContext.js
import React, { createContext, useReducer } from 'react';

const initialState = {
  venue: {},
  bars: [],
  bathrooms: [],
  items: [],
  activeOrders: false,
  inScreenOrders:[]
};

const MyContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR':
      return initialState;
    case 'LOAD':
      return { ...state, venue: action.payload.data.venue, bars: action.payload.data.bars,
        items: action.payload.data.items, bathrooms: action.payload.data.bathrooms,inScreenOrders:action.payload.data.orders };
    case 'ACTIVEORDER':
      console.log('setting active orders to: ' + action.payload)
      return {...state,activeOrders:action.payload}
    case 'INSCREENORDERUPDATE':
      console.log('What am i setting the context to?')
      console.log(action)
      console.log(action.payload)
      const item = state.inScreenOrders.find(item => item.readable_ID === action.payload.readable_ID);
      
      const updatedOrders = item ? state.inScreenOrders.map(item => item.readable_ID === action.payload.readable_ID ? action.payload : item): [...state.inScreenOrders,action.payload]
      return{
        ...state,
        inScreenOrders: updatedOrders,
        activeOrders:true}
    //  const newList = state.inScreenOrders = state.inScreenOrders.sort((a,b) => a.Created - b.Created)
      return 
    case 'REMOVEORDERFROMSCREEN':
      console.log(action.payload)    
     const filteredList = state.inScreenOrders.filter(item =>item.readable_ID != action.payload)
     return{
      ...state,
      inScreenOrders: filteredList,
      activeOrders:filteredList.lengh>0}
    case 'ACCEPTORDER':
        console.log('Accept the order here:')
        console.log(action.payload)    
       const updateList = state.inScreenOrders.map(item =>{
         if (item.readable_ID == action.payload){
           return {...item, is_accepted:true }
         }
         return item
       })
       console.log('updated list:')
       console.log(updateList)
       return{
        ...state,
        inScreenOrders: updateList}
    default:
      return state;
  }
};

const MyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clear = () => {
    dispatch({ type: 'CLEAR' });
  };

  const load = (data) => {
    dispatch({ type: 'LOAD', payload: data });
  };

  const setActiveOrders = (data) => {
    dispatch({ type: 'ACTIVEORDER', payload: data });
  };

  const inScreenOrdersUpdate = (data) => {
    dispatch({ type: 'INSCREENORDERUPDATE', payload: data });
  }

  const acceptedOrder = (data) => {
    dispatch({ type: 'ACCEPTORDER', payload: data });
  }

  const screenRemoveOrder = (customerID) => {
    dispatch({ type: 'REMOVEORDERFROMSCREEN', payload: customerID });
  }
  

  return (
    <MyContext.Provider value={{ state, clear, load,setActiveOrders,inScreenOrdersUpdate, screenRemoveOrder,acceptedOrder }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider, };


