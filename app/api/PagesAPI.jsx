'use strict';

const Cookie = require('universal-cookie');
const axios = require('axios');

module.exports = {
	getPages: function () {
		let cookie = new Cookie;
		let access_token = cookie.get('jwt');
		let activePages = [];
		let inactivePages = [];
		if (access_token === undefined) {
			console.log("No access_token!");
			return [];
		}
		let requestUrl = `http://localhost:3001/api/pages?access_token=${access_token}`;
		return axios.get(requestUrl).then(function (res) {
			return res.data.data;
		}, function (err) {
			throw new Error(err);
		});
	},
	activePage: function (pageid, updateComponent) {
		let cookie = new Cookie;
		let access_token = cookie.get('jwt');
		if (access_token === undefined) {
			console.log("No access_token!");
			return;
		}
		let requestUrl = `http://localhost:3001/api/pages/${pageid}/active?access_token=${access_token}`;
		return axios.post(requestUrl).then(function (res) {
			if (res.data.err) {
				alert("Fail to active some pages. Please try again!");
			}
			updateComponent();
			return res.data.msg;
		}, function (err) {
			alert("Fail to active some pages. Please try again!");
		});
	}
};
