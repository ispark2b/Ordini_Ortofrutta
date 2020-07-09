var base_url= 'http://localhost:3000'

$(function (){

    
    var $name = $('#name');
    var $price = $('#price');
    var $quantity = $('#quantity');
    

    $('#add-order').on('click',function(){
        var order = {
            name:$name.val(),
            price:$price.val(),
            quantity:$quantity.val()
        };

        $.ajax({
            type:'POST',
            url:base_url+'/api/orders',
            data:order,
            success:function(res){
                if(!res.success){
                    alert(res.message);
                }else{
                    alert('Order added successfully !');
                    location.reload();
                }
            },
            error:function(){
                alert('No connection with server !');
            }
        })
    });


});