var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
 
// set up a mongoose model
var UserSchema = new Schema({
  name: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    }
});
 
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, res) {
                if (err) {
                    return next(err);
                }
                user.password = res;
                next();
            });
        });
    } else {
        return next();
    }
});
 
UserSchema.methods.comparePassword = function (passw, callback) {
    bcrypt.compare(passw, this.password, function (err, res) {
        if (err) {
            return callback(err);
        }
        callback(null, res);
    });
};
 
module.exports = mongoose.model('User', UserSchema);