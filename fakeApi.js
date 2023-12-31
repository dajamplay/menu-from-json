const jsonData = [
    {
        "title": "Заголовок пункта меню",
        "url": "https://test.site/item1"
    },
    {
        "title": "Заголовок пункта меню1",
        "url": "https://test.site/item2",
        "children": [{
            "title": "Заголовок пункта меню2",
            "url": "https://test.site/item3"
        },
            {
                "title": "Заголовок пункта меню3",
                "url": "https://test.site/item3",
                "children": [{
                    "title": "Заголовок пункта меню4",
                    "url": "https://test.site/item4"
                },
                    {
                        "title": "Заголовок пункта меню6",
                        "url": "https://test.site/item6"
                    }
                ]
            }
        ]
    },
    {
        "title": "Заголовок пункта меню5",
        "url": "https://test.site/item5"
    }
];

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const getMenuFromFakeApi = async (ms) => {
    await delay(ms);
    return jsonData;
}

