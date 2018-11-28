import render from '../modules/render';
// import our main App component

export default (req, res, next) => {
  render(req.originalUrl).then(({html}) => {
    res.send( html );
  }, () => {
    res.status(404).end();
  });
}
