const db = require('../config/db');

//** 
/*   
*/
exports.get_lls = async (userID) => {
    const result = await db.query(
        'SELECT * FROM user_love_languages WHERE user_id = $1',
        [userID]
    )

    //Array of objects - key-value pairs of column and row data
    //One array with one users data - multiple rows, one user
    return result.rows;
} 
//** 
/*   
*/
exports.replace_lls = async(userID, loveLangs) => {
    const result = await db.query(
        'UPDATE user_love_languages SET dataHERE  WHERE user_id = $1, love_language_id = $2',
        [userID, loveLangs[0], loveLangs[1], loveLangs[2], loveLangs[3], loveLangs[4]]
    )
}

//** 
/*   
*/
exports.findByEmail = async (email) => {
    const result = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    return result.rows[0];
}

//** 
/*   
*/
exports.create = async ({ email, passwordHash }) => {
    const result = await db.query(
        `INSERT INTO users (email, password_hash)
        VALUES ($1, $2)
        RETURNING id, email`,
        [email, passwordHash]
    );

    return result.rows[0];
}