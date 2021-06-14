class Admin {
    constructor() {
        this.authenticated = false;
    }

    login(callback) {
        this.authenticated = true;
        callback()
    }

    logout(callback) {
        this.authenticated = false;
        callback()
    }

    isAuthenticated() {
        console.log(this.authenticated)
        return this.authenticated;
    }
}
export default new Admin();
