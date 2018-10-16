'use strict';

function getPartnerId() {
    return 'ColossusHtb';
}

function getStatsId() {
    return 'CLSS';
}

function getBidRequestRegex() {
    return {
        method: 'POST',
        urlRegex: /\.*colossusssp.com\/\?c=o&m=multi/
    };
}

function getCallbackType() {
    return 'NONE';
}

function getArchitecture() {
    return 'SRA';
}

function getConfig() {
    return {
        xSlots: {
            1: {
                size: [300, 250],
                placementId: 123
            },
            2: {
                size: [300, 250],
                placementId: 124
            }
        }
    };
}

function validateBidRequest(request) {
    expect(request.host).toBe('colossusssp.com');
    expect(request.query.c).toBe('o');
    expect(request.query.m).toBe('multi');
}

function getValidResponse(request, creative) {
    return JSON.stringify([
        {
            width: 300,
            height: 250,
            cpm: 200,
            ad: creative,
            requestId: 123,
            ttl: 120,
            creativeId: '123',
            currency: 'USD',
            mediaType: 'banner'
        },
        {
            width: 300,
            height: 250,
            cpm: 100,
            ad: creative,
            requestId: 124,
            ttl: 120,
            creativeId: '123',
            currency: 'USD',
            mediaType: 'banner'
        }
    ]);
}

function validateTargeting(targetingMap) {
    expect(targetingMap).toEqual(jasmine.objectContaining({
        ix_clss_cpm: jasmine.arrayContaining(['300x250_200', '300x250_100']),
        ix_clss_id: jasmine.arrayContaining([jasmine.any(String), jasmine.any(String)])
    }));
}

function getPassResponse() {
    return '[]';
}

function getValidBidResponseWithDeal(request, creative) {
    return JSON.stringify([
        {
            width: 300,
            height: 250,
            cpm: 200,
            ad: creative,
            requestId: 123,
            ttl: 120,
            creativeId: '123',
            currency: 'USD',
            dealId: 'deal_test_1',
            mediaType: 'banner'
        },
        {
            width: 300,
            height: 250,
            cpm: 100,
            ad: creative,
            requestId: 124,
            ttl: 120,
            creativeId: '123',
            currency: 'USD',
            dealId: 'deal_test_2',
            mediaType: 'banner'
        }
    ]);
}

function validateTargetingWithDeal(targetingMap) {
    expect(targetingMap).toEqual(jasmine.objectContaining({
        ix_clss_cpm: jasmine.arrayContaining(['300x250_200', '300x250_100']),
        ix_clss_dealid: jasmine.arrayContaining(['300x250_deal_test_1', '300x250_deal_test_2']),
        ix_clss_id: jasmine.arrayContaining([jasmine.any(String), jasmine.any(String)])
    }));
}

module.exports = {
    getPartnerId: getPartnerId,
    getStatsId: getStatsId,
    getBidRequestRegex: getBidRequestRegex,
    getCallbackType: getCallbackType,
    getArchitecture: getArchitecture,
    getConfig: getConfig,
    validateBidRequest: validateBidRequest,
    getValidResponse: getValidResponse,
    validateTargeting: validateTargeting,
    getPassResponse: getPassResponse,
    getValidBidResponseWithDeal: getValidBidResponseWithDeal,
    validateTargetingWithDeal: validateTargetingWithDeal
};
