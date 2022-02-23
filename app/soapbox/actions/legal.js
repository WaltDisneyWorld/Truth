import { staticClient } from '../api';

export const FETCH_LEGLA_PAGE_REQUEST = 'FETCH_LEGLA_PAGE_REQUEST';
export const FETCH_LEGLA_PAGE_SUCCESS = 'FETCH_LEGLA_PAGE_SUCCESS';
export const FETCH_LEGLA_PAGE_FAIL    = 'FETCH_LEGLA_PAGE_FAIL';

export function fetchLegalPage(slug = 'index', locale) {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_LEGLA_PAGE_REQUEST, slug, locale });
    const filename = `${slug}${locale ? `.${locale}` : ''}.html`;
    return staticClient.get(`/instance/legal/${filename}`).then(({ data: html }) => {
      dispatch({ type: FETCH_LEGLA_PAGE_SUCCESS, slug, locale, html });
      return html;
    }).catch(error => {
      dispatch({ type: FETCH_LEGLA_PAGE_FAIL, slug, locale, error });
      throw error;
    });
  };
}
