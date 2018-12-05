import sm from 'sitemap';
import fs from 'fs';
import path from 'path';

const folder = path.resolve(__dirname, '../../..', 'pages');

export default {
  channel: ( { channelUsername, posts} ) => {
    const sitemapUrls = posts.filter( p => p.seo.sitemap )
      .map(( post ) => {
        return {
          url: post.url.replace('/channel/' + channelUsername, ''),
          changefreq: 'daily'
        };
      });

    return new Promise((resolve, reject) => {
      const sitemap = sm.createSitemap({
        hostname: 'https://tg-chan.top/channel/' + channelUsername + '/',
        cacheTime: 600000,
        urls: sitemapUrls
      });

      fs.writeFile(folder + '/channel/' + channelUsername + '/sitemap.xml', sitemap.toString(), ( err ) => {
        if ( err ) {
          return reject( err );
        }

        resolve();
      });
    });
  },
  main: ( channels ) => {
    const sitemapUrls = channels.map(( channel ) => {
      return {
        url: channel.url,
        changefreq: 'daily'
      };
    });

    return new Promise((resolve, reject) => {
      const smi = sm.buildSitemapIndex({
        cacheTime: 600000,
        hostname: 'https://tg-chan.top',
        urls: ['/sitemap.xml'].concat(sitemapUrls.map( c => c.url + '/sitemap.xml'))
      });

      sitemapUrls.unshift({
        url: '/',
        changefreq: 'daily'
      });

      const sitemap = sm.createSitemap({
        hostname: 'https://tg-chan.top',
        cacheTime: 600000,
        urls: sitemapUrls
      });

      fs.writeFile(folder + '/sitemap.xml', sitemap.toString(), ( err ) => {
        if ( err ) {
          console.log( err );
        }
      });

      fs.writeFile( folder + '/sitemap_index.xml', smi.toString(), ( err ) => {
        if ( err ) {
          return reject( err );
        }

        resolve();
      });
    });
  }
};
