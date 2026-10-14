//Business logic (Hashing, JWT)

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/user.repositories');

/** 
 * Retrive LL rankings
 */
exports.retrieve_lls = async ({userID}) => {

    retrieved_LLs = userRepo.get_lls(userID);
    
    if(!userID || !retrieved_LLs){
        throw new Error('User data not found');
    }

    //Array of objects - key-value pairs of column and row data
    return retrieved_LLs;
}

/**
 * Replace love language rankings
 */
exports.replace_lls = async ({userID, loveLangs}) => {
    updated = userRepo.replace_lls(userID, loveLangs);

    if(!userID){
        throw new Error('User data not found');
    }

    if(updated){
        throw new Error('Update unsuccessful');
    }

    return updated;
}

/**
 * Registers a new user
 */

exports.register = async ({ email, password }) => {
    //Basic Validation

    if(!email || !password){
        throw new Error('Email and password are required');
    }

    //Check if user already exists
    const existingUser = await userRepo.findByEmail(email);
    if(existingUser){
        throw new Error('User already exists');
    }

    /**
   * Hash the password
   * - Never store plaintext passwords
   * - bcrypt adds a salt automatically
   */

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await userRepo.create({ email, passwordHash });
    
    return user;
};

/**
 * Logs in a user and issues a JWT
 */

exports.login = async ({ email, password }) => {
    const user = await userRepo.findByEmail(email);

    if(!user){
        throw new Error('Invalid credentials');
    }

    // Compare plaintext password to stored hash
    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if(!passwordValid){
        throw new Error('Invalid credentials');
    }

    
  /**
   * Create JWT
   * Payload contains user identity
   * Secret signs the token
   */
  const token = jwt.sign(
    { userID: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1h'}
  );

  return { token };

}

