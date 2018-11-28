import axios from 'axios';
import generate from './generate';
import sitemap from '../modules/seo/sitemap';

export default async () => {
  await axios.get('http://localhost:3333/channel').then( async ({ data: channels }) => {
    const sitemapChannelsData = [];

    if ( !channels.length ) {
      return ;
    }

    await ( async function generateChannel( channelIndex ){
      const username = channels[channelIndex].username;
      sitemapChannelsData.push( await generate.channel(username) );

      channelIndex++;

      if ( channels[ channelIndex ] ) {
        await generateChannel( channelIndex );
      }
    })(0);

    sitemap.main( sitemapChannelsData );

    (async function processChannel( channelIndex ){
      const chatId = channels[ channelIndex ].chatId;
      const sitemapPostsData = {
        channelUsername: channels[channelIndex].username,
        posts: []
      };
      await axios.get('http://localhost:3333/post?chatId=' + chatId).then( async ({ data: posts }) => {
        if ( !posts.length ) {
          return ;
        }

        return await ( async function processPost( postIndex ){
          const link = posts[ postIndex ].link;

          sitemapPostsData.posts.push( await generate.post(link) );

          postIndex ++;

          if ( posts[ postIndex ] ) {
            await processPost( postIndex );
          }
        } )(0);
      } );

      sitemap.channel( sitemapPostsData );

      channelIndex ++;

      if ( channels[ channelIndex ] ) {
        await processChannel(channelIndex);
      }
    })(0);
  } );

  await generate.main();
};
