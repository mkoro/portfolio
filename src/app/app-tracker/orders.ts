export enum Product {
    a = 'Product A',
    b = 'Product B'
};

export type Attachment = {
    filename: string,
    url: string
}

export type TrackerComment = {
    author: string,
    dateString: string,
    content: string
};

export type Order = {
    orderId: string,
    value: number,
    product: Product,
    attachments: Attachment[],
    comments: TrackerComment[]
};

export const sampleOrders: Order[] = [
    {
        orderId: 'A00003',
        value: 350,
        product: Product.a,
        attachments: [{
            filename: 'contract.pdf',
            url: ''
        }],
        comments: [{
            author: 'Jack from Sales',
            dateString: '2019-04-01T13:55:04Z',
            content: 'Finally managed to close this deal!'
        }]
    },
    {
        orderId: 'A00005',
        value: 420,
        product: Product.a,
        attachments: [{
            filename: 'contract.pdf',
            url: ''
        },{
            filename: 'amendment.pdf',
            url: ''
        }],
        comments: [{
            author: 'Jack from Sales',
            dateString: '2019-04-01T15:43:12Z',
            content: 'New deal uploaded'
        },{
            author: 'Jack\'s manager',
            dateString: '2019-04-01T15:56:34Z',
            content: 'Could you please also include the amendment?'
        },{
            author: 'Jack from Sales',
            dateString: '2019-04-01T16:24:54Z',
            content: 'Sorry, uploaded it now'
        }]
    },
    {
        orderId: 'A00011',
        value: 50,
        product: Product.a,
        attachments: [{
            filename: 'contract.pdf',
            url: ''
        }],
        comments: [{
            author: 'Pete from Sales',
            dateString: '2019-04-02T09:17:43Z',
            content: 'Just a small one, still contributes to our target!'
        }]
    },
    {
        orderId: 'B00002',
        value: 600,
        product: Product.b,
        attachments: [{
            filename: 'contract.pdf',
            url: ''
        }],
        comments: [{
            author: 'Jill from Sales',
            dateString: '2019-04-03T15:32:26Z',
            content: 'Not bad, is it :)'
        }]
    },
    {
        orderId: 'B00003',
        value: 150,
        product: Product.b,
        attachments: [{
            filename: 'contract.pdf',
            url: ''
        }],
        comments: [{
            author: 'Jack from Sales',
            dateString: '2019-04-04T16:32:15Z',
            content: 'Deal uploaded'
        }]
    }
];
