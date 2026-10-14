//Request/Response logic

const authService = require('./auth.service');

/** 
 * Retrieve LL rankings controller
 */
exports.retrieve_lls = async (req, res) => {
    try{

        const userID = req.user.id;

        const loveLanguagePrefs = await authService.retrieve_lls(userID);

        res.json(loveLanguagePrefs);
    }catch(error){
        res.status(400).json({ error: error.message})
    }
}

/** 
 * Replace LL rankings controller
 */
exports.replace_lls = async (req, res) => {
    try{
        const userID = req.user.id;

        const updated = await authService.replace_lls(userID);

        res.json(updated);
    }catch(error){
        
    }
}

/**
 * Register controller
 * - Receives HTTP request
 * - Passes data to service
 * - Sends HTTP response
*/
exports.register = async (req, res) => {
    try{
        const user = await authService.register(req.body);

        // 201 = Created
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({ error : error.message });
    }
}

/**
 * Login controller
 * - Validates credentials
 * - Returns JWT if valid
*/
exports.login = async (req, res) => {
    try{
        const tokenData = await authService.login(req.body);
        res.json(tokenData);
    } catch(error){
        res.status(401).json({ error: error.message})
    }
}

