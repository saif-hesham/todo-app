import Item from '../item/item.component';
import { Itemt } from '../item/item.component';
import { useState } from 'react';
type PackingProps = {
  items: Itemt[];
  onDeleteItem: (itemId: number) => void;
  onCheck: (itemId: number, packed: boolean) => void;
  onClear: () => void;
};

const PackingList = ({
  items,
  onDeleteItem,
  onCheck,
  onClear,
}: PackingProps) => {
  const [sort, setSort] = useState('input');
  let todoItems: Itemt[] = [];

  switch (sort) {
    case 'input':
      todoItems = items;
      break;
    case 'description':
      todoItems = [...items].sort((a, b) =>
        a.description.localeCompare(b.description)
      );
      break;
    case 'checked':
      todoItems = [...items].sort(
        (a, b) => Number(b.packed) - Number(a.packed)
      );
      break;
  }

  return (
    <div className='list'>
      <ul>
        {todoItems.map(item => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onCheck={onCheck}
          />
        ))}
      </ul>
      <div>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value='input'>Sort by the input</option>
          <option value='description'>Sort by the description</option>
          <option value='checked'>Sort by finished tasks</option>
        </select>
        <button onClick={onClear}>Clear 🧹</button>
      </div>
    </div>
  );
};

export default PackingList;
