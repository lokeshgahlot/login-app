export const ALERT_CLEAR = "ALERT_CLEAR";
export const ALERT_SUCCESS = "ALERT_SUCCESS";
export const ALERT_FAILURE = "ALERT_FAILURE";

export const clear = _ => ({ type: ALERT_CLEAR });
export const success = payload => ({ type: ALERT_SUCCESS, payload });
export const failure = payload => ({ type: ALERT_FAILURE, payload });