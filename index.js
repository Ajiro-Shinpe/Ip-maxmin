
const Reader = require('@maxmind/geoip2-node').Reader;
Reader.open('a.mmdb').then(reader => {
  const response = reader.city('111.88.27.29');
  console.log(response); // 'US'
//   console.log(response.city.names.en); // 'Minneapolis'
//   console.log(response.postal.code); // '55407'
});

