import pug from 'pug';
import getSeoDataFromState from './getSeoDataFromState';

const compileFn = pug.compileFile(__dirname + '/template.pug');


export default ( url, state ) => {
  const data = getSeoDataFromState(url, state);
  return {
    html: compileFn(data),
    data
  };
}
