export const ADD_ITEM = (data) => {
	return {
		type: "ADD_ITEM",
		payload: data,
	};
};

export const REMOVE_ITEM = (data) => {
	return {
		type: "REMOVE_ITEM",
		payload: data,
	};
};

const Cart = (state = [], action) => {
	switch (action.type) {
		case "ADD_ITEM":
			var payload = action.payload;
			console.log(payload);
			return [...state, payload];
		case "REMOVE_ITEM":
			var payload = action.payload;
			var newArray = [];
			state.forEach((ele) => {
				if (ele != payload) {
					newArray.push(ele);
				}
			});
			return newArray;
		default:
			return state;
	}
};

export default Cart;
