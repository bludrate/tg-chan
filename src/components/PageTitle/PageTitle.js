export default (props) => {
  const title = props.title || props.children;

  if ( typeof document !== 'undefined' && title ) {
    document.title = title;
  }

  return props.children || null;
}
