export default {
    name:'order',
    type:'document',
    title: "Order",
    fields : [
        {
            name:'userEmail',
            title: 'User Email',
            type: 'string'
        },
        {
            name:'items',
            title:'Items',
            type: 'array',
            of:[{
                type: 'object',
                fields:[
                    {
                        name:'shop',
                        title:'Shop',
                        type: 'reference',
                        to:[{type:'shop'}],
                    },

                    {
                        name:'quantity',
                        title: 'Quantity',
                        type: 'number'
                    }
                ]
            }]
        },

        {
            name:'orderStatus',
            title: 'Order Status',
            type:'string',
            options: {
                list:[
                    {
                        title:'Pending',
                        value: 'pending'
                    },

                    {
                        title:'Processing',
                        value: 'processing'
                    },
                    {
                        title:'Shipped',
                        value: 'shipped'
                    },
                    {
                        title:'Delivered',
                        value: 'delivered'
                    },
                    {
                        title:'Canceled',
                        value: 'canceled'
                    },                
                ]
            },

            initialValue: 'pending'
        }  
    ]
}