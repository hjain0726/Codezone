var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var cmntSchema=new Schema({
  nme:String,
  cmnt:String
});

module.exports=mongoose.model('Comment',cmntSchema);
