function addZero( number){
  return number > 9 ? number : '0' + number;
}

export default ( seconds ) => {
  let minutes = Math.floor( seconds / 60 );
  let hours;

  seconds = seconds % 60;

  if ( minutes > 59 ) {
    hours = Math.floor( minutes / 60 );
    minutes = minutes % 60;
  }

  return (hours ? addZero( hours ) + ':' : '')
    + addZero( minutes ) + ':'
    + addZero( seconds );
}
