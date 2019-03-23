var AWS = require("aws-sdk");
var fs = require('fs');
var pdf = require('html-pdf');

var content;

let awsConfig = {
    "region": "ap-south-1",
    "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
    "accessKeyId": "AKIAJRCWWY5VL46NRFAA", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();



exports.handler = function(event, context, callback) {
    console.log("value1 = " + event.key1);
    console.log("value2 = " + event.key2);  
    

  

     callback(null,fetchOneByKey());

    //console.log(fetchOneByKey());

  

     //fetchOneByKey();
    // or 
    // callback("some error type"); 
 }


 let  fetchOneByKey = function () {  
    
    var params = {
        TableName: "wp_posts",
        Key: {
            "ID": 44515
        }
    };    

    docClient.get(params, function (err, data) {
        if (err) {
            console.log("wp_posts::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
            //content="wp_posts::fetchOneByKey::error - " + JSON.stringify(err, null, 2);
           // console.log(content);

        }
        else {                        
          // console.log("wp_posts::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
            JSON.stringify(data, null, 2);
            console.log(data.Item.post_content);  
            var options = { format: 'Letter' };

            pdf.create(data.Item.post_content, options).toFile('./businesscard.pdf', function(err, res) {
                if (err) return console.log(err);
                console.log(res); 
                console.log("success with pdf");// { filename: '/app/businesscard.pdf' }
              });
        
            
        }   
    }) 


  

}



