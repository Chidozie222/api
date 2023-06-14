* AmazonApi
// page1
> List each category
* http://localhost:2023/category

// page2
> list of products under each category
* http://localhost:2023/product?category_id=3
> list of products under each category + Cost
* http://localhost:2023/filter/2?lowcost=1000&highcost=3000

// page3
> Details of products selected
* http://localhost:2023/details
> Place Order
* http://localhost:2023/placeorder

//page4
> List of all the orders
* http://localhost:2023/orders

> Update orders details
* http://localhost:2023/updateorder
> Delete Orders
* http://localhost:2023/deleteOrder