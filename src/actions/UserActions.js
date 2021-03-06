export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function handleLogin() {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });

    //eslint-disable-next-line no-undef
    VK.Auth.login(req => {
      if (req.session) {
        let username = req.session.user.first_name;

        dispatch({
          type: LOGIN_SUCCESS,
          payload: username,
        });
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          error: true,
          payload: new Error('Ошибка авторизации'),
        });
      }
    }, 4);
  };
};