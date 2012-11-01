module.exports = {
  instagram: {
      id: String
    , accessToken: String
    , username: String
    , name: {
          first: String
        , last: String
        , full: String
      }
    , bio: String
    , website: String
    , profilePicture: String
    , counts: {
          media: Number
        , follows: Number
        , followedBy: Number
      }
  }
};
