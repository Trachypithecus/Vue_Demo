export default login_required = (to, from, next) => {
    console.log('to:', to);
    console.log('from:', from);
    let token = localStorage.getItem("token");
    if (token) {
        next();
    } else {
        alert("请先登录！")
        next({
            name: 'passport',
            query: {
                action: 'sign_in'
            }
        });
    }
};