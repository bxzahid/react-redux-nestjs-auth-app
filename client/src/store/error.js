// Actions
const CATCH_ERROR = "CATCH_ERROR";

// Reducer
const reducer = (state = {}, { type, payload }) => {
	switch (type) {
		case CATCH_ERROR: {
			return payload.error;
		}
		default:
			return state;
	}
};

export default reducer;

// Action Creators
export const catchError = (error) => ({
	type: CATCH_ERROR,
	payload: { error: error ? error : {} },
});
