const reducer = (state = '', action) => {
  console.log(action)
  switch(action.type) {
    case "FILTER": 
      return action.payload
    default: return state
      
  }
}

export const changeFilter = (filter) => {
  return {
    type: "FILTER",
    payload: filter
  }
}

export default reducer