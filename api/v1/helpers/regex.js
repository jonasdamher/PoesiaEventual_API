'use strict';

const password = /^(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/
const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/

module.exports = {
	password,
	email
}