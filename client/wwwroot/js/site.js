var base_url= 'http://localhost:3000/api'




$(function (){

    var $orders = $('#orders');
    var $tr = $(this).closest('tr');
        $tr.find('input.name').val( $tr.find('span.name').html());
        $tr.find('input.price').val( $tr.find('span.price').html());
        $tr.find('input.quantity').val( $tr.find('span.quantity').html());
    $.ajax({
        type:'GET',
        url:base_url + '/orders',
        success:function(orders){
            $.each(orders,function(i,order){
                $orders.append(`<tr data-id="`+order._id+`">
                    <td>
                        <p>
                            <strong>Name:</strong>
                            <span class="noedit name">`+order.name+`</span>
                            <input class="edit name" value="`+order.name+`">
                        </p> 
                    </td>
                    <td>
                        <p>
                            <strong>Price:</strong>
                            <span class="noedit price">`+order.price+`</span>
                            <input class="edit price" value="`+order.price+`">
                        </p>
                    </td>
                    <td>
                        <p>
                            <strong>Quantity:</strong>
                            <span class="noedit quantity">`+order.quantity+`</span>
                            <input class="edit quantity" value="`+order.quantity+`">
                        </p>
                    </td>
                    <td>
                        <button data-id='`+order._id+`'  class="btn btn-default update">Update</button>
                        <button data-id='`+order._id+`'  class="btn btn-default remove">Delete</button>
                    </td>
        
                </tr>`)
            });
        },
        error:function(){
            alert('No connection with server !');
        }

    });

    $orders.delegate('.remove','click',function(){

        var $tr = $(this).closest('tr');

        $.ajax({
            type:'DELETE',
            url:base_url+`/orders/delete/`+$(this).attr('data-id'),
            success:function(res){
                if(res.success){
                    $tr.fadeOut(200,function(){
                        $(this).remove();
                    });
                }else{
                    alert(res.message);
                }
                
            },
            error:function(res){
                alert(`Ops, something went wrong deleting the order, Error: ${res}`);
            }
        })
    });
    $orders.delegate('.update','click',function(){
        var $tr = $(this).closest('tr');
        var order ={
            name:$tr.find('input.name').val(),
            price:$tr.find('input.price').val(),
            quantity:$tr.find('input.quantity').val()
        }

        $.ajax({
            type:'PUT',
            url:base_url+'/orders/update/'+$tr.attr('data-id'),
            data:order,
            success:function(res){
                if(!res.success){
                    alert(res.message);
                }else{
                    $tr.find('span.name').html(order.name);
                    $tr.find('span.price').html(order.price);
                    $tr.find('span.quantity').html(order.quantity);
                    alert(res.message);
                }
            },
            error:function(err){
                alert(err);
            }
        })
        

        //save



        
        
    });


});