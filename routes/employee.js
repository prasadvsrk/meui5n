exports.findAll = function(req, res) {
    db.collection('empdata', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
exports.addEmp = function(req, res) {
    var emp = req.body;
    console.log('Adding Employee: ' + JSON.stringify(emp));
    db.collection('empdata', function(err, collection) {
        collection.insert(emp, {safe:true}, function(err, result) {
            if (err) { 
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
exports.deleteEmp = function(req, res) {
var empToDelete = req.params.id;	
db.collection('empdata',function(err,collection){
collection.remove({'id':empToDelete},function(err){
	 res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
})
})
}
exports.updateEmp = function(req, res) {
	 var id = req.params.id;
     var emp = req.body;
  db.collection('empdata', function(err, collection) {
        collection.update({'id':id},emp,function(err, result) {
            if (err) { 
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
exports.findById= function (req,res) {
var empId = req.params.id;
db.collection('empdata',function (err,collection) {
	   collection.find( { id: empId } ).toArray(function(err, items) {
            res.send(items);
        });
	
	})
}