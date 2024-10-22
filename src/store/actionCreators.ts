import { Dispatch } from "redux";

import { Action, ActionTypes } from "./actions";

export const paginationChange = (pageSize: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionTypes.PAGINATION_CHANGE, payload: pageSize });
  };
};
