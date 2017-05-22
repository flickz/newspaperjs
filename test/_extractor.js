const chai = require('chai');
const _extractor = require('../newspaperjs/lib/_special/_extractor');

describe("#_extractor", function(){
    describe("#_getCategoryUrls", function(){
        it.only('Should extract category urls',function(){
            let cnnTestUrl = [
                '/money', '/entertainment', '/newsletter', '/celebrity',
                '/opinions','/specials/opinion/opinion-politics',
                 '/specials/opinion/opinion-social-issues','/health',
                 '/specials/health/diet-fitness','/specials/health/living-well',
                 '//money.cnn.com', '//money.cnn.com/data/markets/','//money.cnn.com/technology/',
                    '//money.cnn.com/media/', '/entertainment', '/politics', '/sports', '/africa', undefined
            ];
            let actual = _extractor._getCategoryUrls('http://cnn.com', cnnTestUrl);
            let expected = [
                'http://cnn.com/money', 'http://cnn.com/entertainment', 'http://cnn.com/celebrity',
                'http://cnn.com/opinions', 'http://cnn.com/health', 'http://cnn.com/politics',
                'http://cnn.com/sports', 'http://cnn.com/africa'
            ]
            chai.assert.deepEqual(actual, expected);
        })
    })
})
