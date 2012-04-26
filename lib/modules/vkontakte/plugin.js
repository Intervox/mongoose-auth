var mongoose = require('mongoose')
  , mongooseTypes = require('mongoose-types')
  , _schema = require('./schema')
  , everyauth = require('everyauth');
mongooseTypes.loadTypes(mongoose);
var Email = mongoose.SchemaTypes.Email;

module.exports = function vkontakte (schema, opts) {
  schema.add(_schema);

  schema.static('createWithVK', function (vkUserMeta, accessToken, expires, callback) {
    var expiresDate = new Date;
    expiresDate.setSeconds(expiresDate.getSeconds() + expires);

    var params =  {
      vk: {
          id: vkUserMeta.uid
        , accessToken: accessToken
        , expires: expiresDate
        , name: {
              full: vkUserMeta.first_name + ' ' + vkUserMeta.last_name
            , first: vkUserMeta.first_name
            , last: vkUserMeta.last_name
          }
    , nickname: vkUserMeta.nickname
    , bdate: vkUserMeta.bdate
        , domain: vkUserMeta.domain
        , sex: vkUserMeta.gender
        , photo: vkUserMeta.photo_big
        , timezone: vkUserMeta.timezone
      }
    };

    // TODO Only do this if password module is enabled
    //      Currently, this is not a valid way to check for enabled
    if (everyauth.password)
      params[everyauth.password.loginKey()] = "vk:" + vkUserMeta.uid; // Hack because of way mongodb treate unique indexes

    this.create(params, callback);
  });
};
