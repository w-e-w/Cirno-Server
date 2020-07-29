const get = require("../mixin/http").getHbooker;

let my_info = async function (reader_id) {
  let res = await get({
    url: "/reader/get_my_info",
    para: {
      reader_id: reader_id,
    },
  });
  return res;
};

module.exports = my_info;