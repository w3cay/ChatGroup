module.exports = {
    /*

        Function

        Function ( paramsAndBody...: string )

        Return Type:
        Function

        Description:
        

        URL doc:
        http://html5index.org/ECMAScript%20-%20Function.html#Function

    */
    isLogin: function (req) {
        var isLoginRes;
        if (!req.session.userid) {
           isLoginRes = false;
        } else {
           isLoginRes = true;
        }
        return isLoginRes;
    }
}