parking.factory('httpTimestampInterceptor', function () {
    return {
        'request': function (config) {

            if (config.url.startsWith('http')) {
                // console.log('request: ', config)
                console.log('url: ', config.url);

                const timestamp = Date.now();
                config.url = `${config.url}?ts=${timestamp}`
                console.log('url updated: ', config.url);
            }

            return config
        }
    }
});