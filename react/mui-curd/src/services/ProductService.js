const KEYS = {
    products: 'products',
    productId: 'productId'
}

const initialState = {
    products: [
        {
            id: 1,
            name: "チョコレート",
            category: 1,
            weight: 100,
            price: 120
        },
        {
            id: 2,
            name: "りんご",
            category: 2,
            weight: 500,
            price: 360
        },
    ]
};

export const getCategoryCollection = () => ([
    { id: 1, title: 'お菓子' },
    { id: 2, title: 'フルーツ' }
])

export function insertProduct(data) {
    let Products = getAllProducts();
    data['id'] = generateProductId()
    Products.push({ ...data, weight: parseInt(data.weight), price: parseInt(data.price) })
    localStorage.setItem(KEYS.products, JSON.stringify(Products))
}

export function updateProduct(data) {
    let Products = getAllProducts();
    let recordIndex = Products.findIndex(x => x.id === data.id);
    Products[recordIndex] = { ...data, weight: parseInt(data.weight), price: parseInt(data.price) }
    localStorage.setItem(KEYS.products, JSON.stringify(Products));
}

export function removeProduct(data) {
    let Products = getAllProducts();
    localStorage.setItem(KEYS.products, JSON.stringify(Products.filter((el) => (el.id !== data.id))));
}

export function generateProductId() {
    var maxId = 0
    if (localStorage.getItem(KEYS.productId) === null || String(localStorage.getItem(KEYS.productId) == 'NaN')) {
        if (localStorage.getItem(KEYS.products) !== null || localStorage.getItem(KEYS.products).length !== 0) {
            let Products = JSON.parse(localStorage.getItem(KEYS.products));
            if (Products.length != 0) {
                maxId = Math.max(...Products.map(o => o.id))
            }
        }
    } else {
        maxId = parseInt(localStorage.getItem(KEYS.productId))
    }

    localStorage.setItem(KEYS.productId, (maxId + 1).toString())
    return maxId + 1;
}

export function getAllProducts() {
    if (localStorage.getItem(KEYS.products) == null)
        localStorage.setItem(KEYS.products, JSON.stringify(initialState.products))
    let Products = JSON.parse(localStorage.getItem(KEYS.products));
    //map CategoryID to Category title
    let Categorys = getCategoryCollection();
    return Products.map(x => ({
        ...x,
        categoryName: Categorys[x.category - 1].title
    }))
}