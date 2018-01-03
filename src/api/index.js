/**
 * This is a simple API that mocks the actions you might expect from an online service.
 */

import * as generateId from 'uuid/v4';

let cats = [
  {
    id: generateId(),
    firstName: 'Mr.',
    lastName: 'Boots',
    location: 'Cleveland',
    company: 'Boots, INC',
    title: 'CTO (cat tech officer)',
    email: 'boots@bootsinc.cat',
    phone: '1-800-meow-mix',
    notes: 'Soy milk only... hipster cat apparently.',
    img: 'http://cdn1-www.cattime.com/assets/uploads/2015/06/affection3.png',
  },
  {
    id: generateId(),
    firstName: 'Mrs.',
    lastName: 'Precious',
    location: 'Erie',
    company: 'Precious moments',
    title: 'CSO (Chief Sleeping Officer)',
    email: 'precious@moments.pur',
    phone: '1-800-sleep-all-day',
    notes: 'Purrs like a running engine',
    img: 'https://media.giphy.com/media/kLALBwFNGHcGY/giphy.gif',
  },
  {
    id: generateId(),
    firstName: 'Tommy',
    lastName: 'Tutone',
    location: 'Manila',    
    company: 'Model Cats, LLC.',
    title: 'Web Lackey',
    email: 'wheresthemilk@meow.com',
    phone: '1-800-catnip',
    notes: 'The best at what he does.',
    img: 'http://cdn3-www.cattime.com/assets/uploads/2015/06/shredding3.png',
  },
];

const updateCats = (cat) => {
  const newCat = {
    ...cat,
    id: generateId(),
  };

  cats = [
    ...cats,
    newCat,
  ];

  return new Promise(resolve => resolve(cats));
};

const api = {
  getCats: () => new Promise(resolve => resolve(cats)),
  addCat: cat => updateCats(cat),
};

export default api;
