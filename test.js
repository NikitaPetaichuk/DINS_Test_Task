const axios = require('axios');
const assert = require('chai').assert;

async function makeRequest(requestData) {
    const requestUrlTemplate = 'https://jsonplaceholder.typicode.com/posts'

    return await axios.get(requestUrlTemplate, {
        params: {
            userId: requestData.userId,
            title: requestData.title
        }
    });
}

describe('JSONPlaceholder testing', function () {
    let response = null;

    let testCases = [
        {userId: 1, title: 'qui est esse'},
        {userId: 'a', title: 'qui est esse'},
        {userId: -1, title: 'qui est esse'},
        {userId: 11, title: 'qui est esse'},
        {userId: '', title: 'qui est esse'}
    ]

    it('Correct GET /posts?userId=<id>&title=<title> request', async function () {
        response = await makeRequest(testCases[0]);

        assert.equal(response.status, 200, "Response status != 200!");
        assert.notEqual(response.data, [], "Response is empty!");
        assert.property(response.data[0], 'userId', "UserId attribute doesn't exists!");
        assert.equal(response.data[0].userId, testCases[0].userId, "UserId is incorrect!");
        assert.property(response.data[0], 'title',  "Title attribute doesn't exists!");
        assert.equal(response.data[0].title, testCases[0].title, "Title is incorrect!");
    });

    it('GET /posts?userId=<id>&title=<title> request with non-numeric userId', async function () {
        response = await makeRequest(testCases[1]);

        assert.equal(response.status, 200, "Response status != 200!");
        assert.equal(response.data.length, 0, "Unexpected non-empty result.");
    });

    it('GET /posts?userId=<id>&title=<title> request with invalid userId', async function () {
        response = await makeRequest(testCases[2]);

        assert.equal(response.status, 200, "Response status != 200!");
        assert.equal(response.data.length, 0, "Unexpected non-empty result.");
    });

    it('GET /posts?userId=<id>&title=<title> request with non-existent userId', async function () {
        response = await makeRequest(testCases[3]);

        assert.equal(response.status, 200, "Response status != 200!");
        assert.equal(response.data.length, 0, "Unexpected non-empty result.");
    });

    it('GET /posts?userId=<id>&title=<title> request with empty userId', async function () {
        response = await makeRequest(testCases[4]);

        assert.equal(response.status, 200, "Response status != 200!");
        assert.equal(response.data.length, 0, "Unexpected non-empty result.");
    });
});
