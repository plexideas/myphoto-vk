export const GET_PHOTOS_REQUEST = 'GET_PHOTOS_REQUEST';
export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';
export const GET_PHOTOS_FAILURE = 'GET_PHOTOS_FAILURE';

let photosArr = [];
let cached = false;

function makeYearPhotos(photos, year) {
  let createdYear, yearPhotos = [];
  
  photos.forEach(item => {
    createdYear = new Date(item.date * 1000).getFullYear();
    if (createdYear === year) {
      yearPhotos.push(item);
    }
  });

  yearPhotos.sort((a, b) => b.likes.count - a.likes.count);
  
  return yearPhotos;
}

function getMorePhoto(offset, count, year, dispatch) {
  //eslint-disable-next-line no-undef
  VK.Api.call(
    'photos.getAll',
    { extended: 1, count: count, offset: offset, v: '5.92' },
    req => {
      try {
        photosArr = photosArr.concat(req.response.items);        
        offset = offset + count;
        if (req.response.count > offset) {
          getMorePhoto(offset, count, year, dispatch)
        } else {
          let photos = makeYearPhotos(photosArr, year);
          cached = true;          
          dispatch({
            type: GET_PHOTOS_SUCCESS,
            payload: photos,
          })
        }
      } catch (error) {
        dispatch({
          type: GET_PHOTOS_FAILURE,
          error: true,
          payload: new Error(error),
        })
      }
    }
  )
}

export function getPhotos(year) {
  return (dispatch) => {
    dispatch({
      type: GET_PHOTOS_REQUEST,
      payload: year,
    });
    
    if (cached) {
      let photos = makeYearPhotos(photosArr, year);
      dispatch({
        type: GET_PHOTOS_SUCCESS,
        payload: photos,
      })
    } else {
      getMorePhoto(0, 200, year, dispatch);
    }
  };
};