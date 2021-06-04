const items = [
  // this is the parent or 'item'
  {
      name: 'Region',
      id: 0,
      // these are the children or 'sub items'
      children: [
          {
              name: 'WEST EUROPE',
              id: 1,
          },
          {
              name: 'EAST EUROPE',
              id: 2,
          },
          {
              name: 'NORTH AMERICA',
              id: 3,
          },
          {
              name: 'SOUTH AMERICA',
              id: 4,
          },
          {
              name: 'ASIA',
              id: 5,
          },
          {
              name: 'PACIFIC',
              id: 6,
          },
          {
              name: 'MIDDLE EAST',
              id: 7,
          },
          {
              name: 'AFRICA',
              id: 8,
          },
      ],
  }
];

export default function onSelectedItemsChange(selectedItems) {
    let criteria = [];

    selectedItems.forEach(element => {
        let region = items[0].children;
        region.forEach(el => {
            if (el.id == element) {
                criteria.push({ Region: el.name });
            }
        })
    });

    return criteria;
};