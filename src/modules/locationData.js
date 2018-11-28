const apiHost = 'https://static-maps.yandex.ru/1.x/';
const linkHost = 'https://maps.google.com/maps';
//const apiKey = 'AIzaSyDopwTsUUnsBgfBincnDcAJpvwxINKX-zk';

export default ( { location, size = { width: 600, height: 400 }, zoom = 15 } ) => {
  return {
    img: `${apiHost}?ll=${location.longitude},${location.latitude}&scale=1.5&pt=${location.longitude},${location.latitude},comma&l=map&z=${zoom}&size=${size.width},${size.height}&lang=${navigator.language}`,
    link: `${linkHost}?q=${location.latitude},${location.longitude}&ll=${location.latitude},${location.longitude}&z=16`
  };
};
