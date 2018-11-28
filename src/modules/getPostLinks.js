export default ( postWebLink ) => {
  const postLinkData = postWebLink.replace('https://t.me/', '').split('/');
  const link = `tg://resolve?domain=${postLinkData[0]}&post=${postLinkData[1]}`;
  const pageLink = `/channel/${postLinkData[0]}/${postLinkData[1]}/`;
  const channelLink = `/channel/${postLinkData[0]}/`;

  return {
    link,
    pageLink,
    channelLink
  };
}
