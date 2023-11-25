module.exports = (configserverdb, Sequelize) => {
    const User = configserverdb.define("users", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    return User;
}