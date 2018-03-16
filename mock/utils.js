const qs = require('qs');
const delay = 500;

module.exports = {

    createResponse: function(dataKey) {
        return function(req, res) {
            setTimeout(function() {
                res.json({
                    status: 'OK',
                    content: global[dataKey]
                });
            }, delay);
        }
    },

    createPageResponse: function(dataKey) {
        return function(req, res) {
            setTimeout(function() {
                res.json({
                    status: 'OK',
                    content: {
                        total: 0,
                        page: global[dataKey]
                    }
                });
            }, delay);
        }
    },

    createDetailResponse: function(detailKey, childKey, childDataKey) {
        return function(req, res) {
            setTimeout(function() {
                var detail = global[detailKey][0];
                if (childKey) {
                    detail[childKey] = global[childDataKey]
                }
                res.json({
                    success: true,
                    content: detail
                });
            }, delay);
        };
    },

    createSaveResponse: function(dataKey) {
        return function(req, res) {
            const item = JSON.parse(req.body);
            console.log(item);

            if (item.id) {
                const originItem = global[dataKey].find((entity) => entity.id == item.id);
                Object.assign(originItem, item);
            } else {
                global[dataKey].push(item);
                item.id = 10000 * Math.random();
            }

            setTimeout(function() {
                res.json({
                    success: true,
                    content: []
                });
            }, delay);
        };
    }
};
