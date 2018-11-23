document.addEventListener('DOMContentLoaded', function(){
    
    var forma = document.getElementById('commentForma');
    console.log(forma);
    
    var btn = forma.getElementsByTagName('button')[0];
    btn.addEventListener('click', function() {
        //check imput fields.
        var nameInput = document.getElementById('name').value;
        var commentInput = document.getElementById('comment').value;
        
        console.log(nameInput);
        console.log(commentInput);
        
        var nameReg = new RegExp("^[0-9a-zčćžšđ]{1,6}$");
        var commentReg = new RegExp("^.{0,500}$");
        
        var alertStr = "";
        
        var nameTest = nameReg.test(nameInput);
        var commentTest = commentReg.test(commentInput);
        
        if(!nameTest){
            alertStr += "Invalid form of the name. The name should have "+
            "one up to six alphanumeric characters.\n";
        }
        
        if(!commentTest){
            alertStr += "Invalid form of the comment. The comment should be "+
            "at most 500 characters long.";
        }
        
        if(!nameTest || !commentTest){
            alert(alertStr);
        }
        
        
        
        
    })
    
    
})