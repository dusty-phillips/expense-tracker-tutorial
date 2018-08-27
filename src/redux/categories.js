export const initialState = { selectedCategory: null }

export function reducer(state = initialState, action) {
  if (action.type === "selectCategory") {
    return { ...state, selectedCategory: action.category }
  }
  return state
}
