const api_url = "http://127.0.0.1:8010/peoples/"

const KEYS = {
    products: 'peoples',
    productId: 'peopleId'
}

const initialState = {
    peoples: [
        {
            id: 1094,
            name: 'Paul',
            sex: 1,
            wockerDate: '1977-12-29',
            manager: 'Melissa',
            city: '重庆 重庆市'
        },
        {
            id: 1095,
            name: 'John',
            sex: 0,
            wockerDate: '1979-02-02',
            manager: 'Eric',
            city: '安徽省 芜湖市'
        },
        {
            id: 1096,
            name: 'Sandra',
            sex: 1,
            wockerDate: '1987-10-12',
            manager: 'Richard',
            city: '云南省 楚雄彝族自治州'
        },
        {
            id: 1097,
            name: 'Shirley',
            sex: 0,
            wockerDate: '1985-08-16',
            manager: 'Karen',
            city: '广西壮族自治区 玉林市'
        },
        {
            id: 1098,
            name: 'Helen',
            sex: 0,
            wockerDate: '2003-12-13',
            manager: 'Michael',
            city: '湖南省 娄底市'
        }
    ]
};

export const getSexCollection = () => ([
    { id: 0, title: 'female' },
    { id: 1, title: 'male' }
])

export const getSearchKindCollection = () => ([
    { id: 0, title: 'id' },
    { id: 1, title: 'name' },
    { id: 2, title: 'sex' },
    { id: 3, title: 'wockerDate' },
    { id: 4, title: 'manager' },
    { id: 5, title: 'city' },
    { id: 6, title: 'All' },
])

export function insertPeople(data) {
    data['id'] = generatePeopleId();
    return fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.status >= 200 && response.status < 300) {
            console.log("add success!")
            console.log(data)
        }
    }).catch(err => {
        console.log(err)
    })
}

export function updatePeople(data) {
    return fetch(api_url + `${data['id']}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.status >= 200 && response.status < 300) {
            console.log("update success!")
            console.log(data)
            console.log(response)
        }
    }).catch(err => {
        console.log(err)
    })
}

export function removePeople(data) {
    return fetch(api_url + `/${data['id']}`, {
        method: 'DELETE',
    }).then(response => {
        if (response.status >= 200 && response.status < 300) {
            console.log("delete success!")
            console.log(data)
        }
    }).catch(err => {
        console.log(err)
    })
}

export function generatePeopleId() {
    var maxId = 0
    let peoples = getAllPeoples()
    if (peoples.length > 0) {
        maxId = Math.max(...peoples.map(o => o.id))
    }
    return maxId + 1;
}

export async function getAllPeoples() {
    const res = await fetch(api_url)
    let data1 = await res.json()
    let sexs = getSexCollection()
    if (data1 == null) {
        data1 = JSON.stringify(initialState.peoples)
    }
    const peoples = data1.map(x => ({
        ...x,
        sexName: sexs[x.sex].title
    }))
    console.log(peoples)
    return peoples
    // let peoples
    // let sexs = getSexCollection()
    // return fetch(api_url).then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //         peoples = data;
    //         if (data == null) {
    //             peoples = JSON.stringify(initialState.peoples)
    //         }

    //         peoples = peoples.map(x => ({
    //             ...x,
    //             sex: sexs[x.sex].title
    //         }))
    //         console.log(peoples)
    //        Promise.resolve(peoples)
    //     })
    //     .catch(err => console.log('Request Failed', err));
}

export function searchPeople(kind, value) {
    let sexs = getSexCollection()
    console.log(api_url + `?${kind}_like=${value}`)
    return fetch(api_url + `?${kind}_like=${value}`, {
        method: 'Get',
    }).then(response => response.json()).then(data => {
        console.log(api_url + `?${kind}_like=${value}`)
        console.log(data)
        const peoples = data.map(x => ({
            ...x,
            sexName: sexs[x.sex].title
        }))
        console.log(peoples)
        return peoples
    }).catch(err => {
        console.log(err)
    })
}


export function searchMultiple(conditions) {
    let sexs = getSexCollection()
    let url = api_url
    for (let i = 0; i < conditions.length; i++) {
        if (url.indexOf("?") > -1 && conditions[i].value !== "") {
            url += `&${conditions[i].name}_like=${conditions[i].value}`
        } else if (conditions[i].value !== "") {
            url += `?${conditions[i]['name']}_like=${conditions[i]['value']}`
        }
    }
    console.log(url)
    return fetch(url, {
        method: 'Get',
    }).then(response => response.json()).then(data => {
        console.log(data)
        const peoples = data.map(x => ({
            ...x,
            sexName: sexs[x.sex].title
        }))
        console.log(peoples)
        return peoples
    }).catch(err => {
        console.log(err)
    })
}