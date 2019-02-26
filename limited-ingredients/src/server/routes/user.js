const userController = require('./../controllers/user.ctrl');

module.exports = (router) => {
		/**
    show user page
     */
    router
        .route('/user')
        .get(userController.editUserPage);
  	/**
   	show hello world page
   	*/
		router
        .route('/')
        .get(userController.helloWorld);
};