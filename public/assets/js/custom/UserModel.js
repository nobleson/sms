"use strict";

class UserModel{
    constructor(displayName,email,phoneNumber,password,dateRegistered){
        this.id = null
        this.displayName = displayName
        this.email = email
        this.phoneNumber = phoneNumber
        this.password = password
        this.dateRegistered = null

    }
    createUserAccount(){ 
        let result;
        let formData = {
            displayName: this.displayName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            password: this.password
        }
        $.ajax({
          url: 'user/register',
          data: formData, 
          type: 'POST',
          async: false,  
          success: function(data) {
              
              result = data; 
          },error: function (jqXHR, textStatus, errorThrown) {
                 console.log("Error status:"+textStatus);
             }
            
       });
        return result;
    }


}