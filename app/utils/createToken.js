const jwt =  require('jsonwebtoken');

Date.prototype.addDays = function(days){

	var date = new Date(this.valueOf())

	date.setDate(date.getDate() + days);

	return date;

}
const createToken = ({_id,correo}) => {

	const exp = new Date().addDays(1).getTime()

	const payload = {
		_id,
		correo,
		exp
	}

	return jwt.sign(payload, process.env.SECRET_KEY )

}

module.exports = createToken;